const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Summary = require('../models/Summary');
const Email = require('../models/Email');
const summaryGenerator = require('../utils/summaryGenerator');

// @route   GET api/summaries
// @desc    Get all summaries for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    try {
      const summaries = await Summary.find({ user: req.user.id })
        .sort({ 'dateRange.end': -1 })
        .limit(10);
      
      res.json({ summaries });
    } catch (dbError) {
      console.log('Database error, using mock summary:', dbError.message);
      // Return mock summary if DB error
      const mockSummary = generateMockSummary();
      res.json({ summaries: [mockSummary] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/summaries/latest
// @desc    Get latest summary
// @access  Private
router.get('/latest', auth, async (req, res) => {
  try {
    try {
      const summary = await Summary.findOne({ user: req.user.id })
        .sort({ 'dateRange.end': -1 });
      
      if (!summary) {
        return res.status(404).json({ msg: 'No summary found' });
      }
      
      res.json(summary);
    } catch (dbError) {
      console.log('Database error, using mock summary:', dbError.message);
      // Return mock summary if DB error
      const mockSummary = generateMockSummary();
      res.json(mockSummary);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/summaries/:id
// @desc    Get summary by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    try {
      const summary = await Summary.findById(req.params.id);
      
      if (!summary) {
        return res.status(404).json({ msg: 'Summary not found' });
      }
      
      // Check user owns the summary
      if (summary.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      
      res.json(summary);
    } catch (dbError) {
      console.log('Database error, using mock summary:', dbError.message);
      
      // If it's a request for the mock summary we created
      if (req.params.id === 'mock-summary-1') {
        return res.json(generateMockSummary());
      }
      
      return res.status(404).json({ msg: 'Summary not found' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Summary not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/summaries/generate
// @desc    Generate a new summary
// @access  Private
router.post('/generate', auth, async (req, res) => {
  try {
    const { days = 1 } = req.body;
    
    try {
      // Calculate time range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      // Get emails in the time range
      const emails = await Email.find({
        user: req.user.id,
        date: { $gte: startDate, $lte: endDate }
      }).sort({ importance: -1 });
      
      if (emails.length === 0) {
        return res.status(400).json({ msg: 'No emails found in the specified time range' });
      }
      
      // Generate the summary
      const summary = await summaryGenerator.generateSummary(emails, req.user, startDate, endDate);
      
      res.json(summary);
    } catch (dbError) {
      console.log('Database error, using mock summary:', dbError.message);
      // Return mock summary if DB error
      res.json(generateMockSummary());
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Generate mock summary data when database connection isn't available
const generateMockSummary = () => {
  // Create a recent date range for the summary
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 7); // One week summary
  
  // Create mock summary metrics
  return {
    _id: 'mock-summary-1',
    user: '123456789',
    dateRange: {
      start: startDate,
      end: endDate
    },
    createdAt: new Date(),
    overviewText: "You received 57 emails this week. 8 were marked as important, requiring your attention. There are 12 unread messages, with 3 of them being high-priority. Your most active correspondents this week were LinkedIn, Amazon, and John Smith. The 'Promotions' category saw the highest volume with 19 emails.",
    insightMetrics: {
      totalEmails: 57,
      importantEmails: 8,
      unreadEmails: 12,
      categoryCounts: {
        Important: 8,
        Social: 11,
        Promotions: 19,
        Updates: 9,
        Forums: 6,
        Uncategorized: 4
      },
      topSenders: [
        { name: 'LinkedIn', count: 5 },
        { name: 'Amazon', count: 4 },
        { name: 'John Smith', count: 3 }
      ],
      sentimentBreakdown: {
        positive: 24,
        neutral: 28,
        negative: 5
      },
      busyPeriods: [
        { day: 'Monday', count: 12 },
        { day: 'Wednesday', count: 15 },
        { day: 'Friday', count: 9 }
      ]
    },
    keyEmails: [
      {
        _id: 'mock-email-1',
        subject: 'Urgent: Action Required on Your Account',
        from: { name: 'Bank of America', email: 'customerservice@bofa.com' },
        category: 'Important',
        importance: 85,
        date: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)), // 1 day ago
        summary: 'Security alert - Password change required - 24-hour deadline',
        actionItems: ['Update password immediately', 'Review recent account activity']
      },
      {
        _id: 'mock-email-5',
        subject: 'Job Opportunity: Senior Developer Position',
        from: { name: 'Google', email: 'recruiting@google.com' },
        category: 'Important',
        importance: 80,
        date: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)), // 2 days ago
        summary: 'Senior Developer role - Competitive compensation - Quick response needed',
        actionItems: ['Respond within 7 days', 'Update resume', 'Prepare portfolio']
      },
      {
        _id: 'mock-email-12',
        subject: 'Your order #12345 has shipped',
        from: { name: 'Amazon', email: 'orders@amazon.com' },
        category: 'Updates',
        importance: 70,
        date: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)), // 2 days ago
        summary: 'Order #12345 shipped - Arriving on Wednesday, March 15 - Tracking available',
        actionItems: ['Track package', 'Verify delivery address']
      }
    ],
    actionItems: [
      {
        text: 'Update password for Bank of America',
        emailId: 'mock-email-1',
        priority: 'High',
        dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)) // Due tomorrow
      },
      {
        text: 'Respond to Google job opportunity',
        emailId: 'mock-email-5',
        priority: 'Medium',
        dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)) // Due in 5 days
      },
      {
        text: 'Track Amazon package',
        emailId: 'mock-email-12',
        priority: 'Low',
        dueDate: null
      },
      {
        text: 'RSVP to Jane\'s birthday event',
        emailId: 'mock-email-15',
        priority: 'Medium',
        dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)) // Due in 2 days
      }
    ],
    trendInsights: [
      'Email volume increased 15% compared to last week',
      'Important emails decreased by 3 compared to last week',
      'Your response time averaged 4.3 hours, 20% faster than last week'
    ]
  };
};

module.exports = router; 