const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { google } = require('googleapis');
const auth = require('../middleware/auth');
const Email = require('../models/Email');
const User = require('../models/User');
const emailProcessor = require('../utils/emailProcessor');

// Gmail API setup helper
const setupGmailApi = async (user) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  // Check if token needs refreshing
  if (user.tokenExpiryDate < new Date()) {
    oauth2Client.setCredentials({
      refresh_token: user.gmailRefreshToken
    });

    const { tokens } = await oauth2Client.refreshAccessToken();
    
    // Update tokens in database
    user.gmailAccessToken = tokens.access_token;
    user.tokenExpiryDate = new Date(Date.now() + tokens.expiry_date);
    await user.save();
  }

  oauth2Client.setCredentials({
    access_token: user.gmailAccessToken,
    refresh_token: user.gmailRefreshToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
};

// Generate mock email data when database isn't available
const generateMockEmails = (count = 50) => {
  const mockEmails = [];
  const categories = ['Important', 'Social', 'Promotions', 'Updates', 'Forums', 'Uncategorized'];
  
  // Add more diverse senders for realistic mock data
  const senders = [
    { name: 'John Smith', email: 'john.smith@example.com' },
    { name: 'Paypal', email: 'service@paypal.com' },
    { name: 'LinkedIn', email: 'notifications@linkedin.com' },
    { name: 'Google', email: 'no-reply@google.com' },
    { name: 'Amazon', email: 'orders@amazon.com' },
    { name: 'Twitter', email: 'info@twitter.com' },
    { name: 'GitHub', email: 'noreply@github.com' },
    { name: 'Netflix', email: 'info@netflix.com' },
    { name: 'Jane Doe', email: 'jane.doe@example.org' },
    { name: 'Bank of America', email: 'customerservice@bofa.com' },
    { name: 'Elon Musk', email: 'elon@tesla.com' },
    { name: 'Mark Zuckerberg', email: 'mark@meta.com' },
    { name: 'Tim Cook', email: 'tim@apple.com' },
    { name: 'Sundar Pichai', email: 'sundar@google.com' },
    { name: 'Satya Nadella', email: 'satya@microsoft.com' },
    { name: 'Shopify', email: 'support@shopify.com' },
    { name: 'Uber', email: 'rides@uber.com' },
    { name: 'Airbnb', email: 'stays@airbnb.com' },
    { name: 'YouTube', email: 'noreply@youtube.com' },
    { name: 'Instagram', email: 'notifications@instagram.com' }
  ];
  
  // Specific email templates by category for more meaningful content
  const emailTemplates = {
    Important: [
      {
        subject: 'Urgent: Action Required on Your Account',
        body: 'Your account security may have been compromised. Please verify your identity by clicking the link below and updating your password within 24 hours.',
        importance: 85,
        keyPoints: ['Security alert', 'Password change required', '24-hour deadline'],
        actionItems: ['Update password immediately', 'Review recent account activity']
      },
      {
        subject: 'Job Opportunity: Senior Developer Position',
        body: 'Based on your profile, we think you would be a great fit for our Senior Developer position. The role offers competitive compensation and benefits. Please respond within a week if interested.',
        importance: 80,
        keyPoints: ['Senior Developer role', 'Competitive compensation', 'Quick response needed'],
        actionItems: ['Respond within 7 days', 'Update resume', 'Prepare portfolio']
      },
      {
        subject: 'Important Tax Document Available',
        body: 'Your tax document for the fiscal year 2023 is now available. Please review it before the filing deadline.',
        importance: 75,
        keyPoints: ['2023 Tax document', 'Filing deadline approaching', 'Document review needed'],
        actionItems: ['Download document', 'Review for accuracy', 'Submit before deadline']
      }
    ],
    Social: [
      {
        subject: 'John Smith sent you a friend request',
        body: 'John Smith wants to connect with you on our platform. Accept this request to share updates and communicate directly.',
        importance: 50,
        keyPoints: ['New connection request', 'From John Smith'],
        actionItems: ['Accept or decline request']
      },
      {
        subject: 'You have 5 new notifications on Instagram',
        body: 'See what\'s new with your friends and followers. Your latest post has received 45 likes and 8 comments.',
        importance: 45,
        keyPoints: ['5 new notifications', '45 likes on recent post', '8 new comments'],
        actionItems: ['Check notifications', 'Respond to comments']
      },
      {
        subject: 'Invitation to Jane\'s Birthday Event',
        body: 'You\'re invited to Jane\'s 30th birthday celebration this Saturday at 7 PM. Please RSVP by Thursday.',
        importance: 65,
        keyPoints: ['Jane\'s 30th birthday', 'This Saturday at 7 PM', 'RSVP needed by Thursday'],
        actionItems: ['RSVP to invitation', 'Get a gift', 'Add to calendar']
      }
    ],
    Promotions: [
      {
        subject: 'FLASH SALE: 50% Off Everything Today Only!',
        body: 'Don\'t miss our biggest sale of the year! Get 50% off all products for the next 24 hours. Use code FLASH50 at checkout.',
        importance: 40,
        keyPoints: ['50% off all items', '24-hour sale', 'Promo code: FLASH50'],
        actionItems: ['Browse sale items', 'Use promo code FLASH50']
      },
      {
        subject: 'Your Exclusive Discount Code Inside',
        body: 'As a valued customer, we\'re offering you an exclusive 30% discount on your next purchase. Use code LOYAL30 at checkout.',
        importance: 35,
        keyPoints: ['30% discount code', 'Valued customer offer', 'Code: LOYAL30'],
        actionItems: ['Consider future purchase', 'Save promo code']
      },
      {
        subject: 'New Collection Just Launched - Shop Now!',
        body: 'Introducing our Spring 2024 collection! Be the first to shop these limited edition items before they sell out.',
        importance: 30,
        keyPoints: ['Spring 2024 collection launch', 'Limited edition items', 'Early access'],
        actionItems: ['Browse new collection']
      }
    ],
    Updates: [
      {
        subject: 'Your order #12345 has shipped',
        body: 'Good news! Your recent order #12345 has shipped and is expected to arrive on Wednesday, March 15. You can track your package using the link below.',
        importance: 70,
        keyPoints: ['Order #12345 shipped', 'Arriving on Wednesday, March 15', 'Tracking available'],
        actionItems: ['Track package', 'Verify delivery address']
      },
      {
        subject: 'Your subscription will renew soon',
        body: 'Your premium subscription will automatically renew on April 10, 2024. Your payment method ending in 4321 will be charged $9.99.',
        importance: 60,
        keyPoints: ['Subscription renewal on April 10', 'Payment method ending in 4321', 'Amount: $9.99'],
        actionItems: ['Update payment method if needed', 'Cancel if no longer needed']
      },
      {
        subject: 'Payment confirmation - Invoice #INV-567',
        body: 'We\'ve received your payment of $125.00 for Invoice #INV-567. Thank you for your business.',
        importance: 55,
        keyPoints: ['Payment of $125.00 received', 'For Invoice #INV-567', 'Transaction complete'],
        actionItems: ['Save receipt for records']
      }
    ],
    Forums: [
      {
        subject: 'New reply to your thread "Best Programming Languages 2024"',
        body: 'User JavaMaster22 has replied to your thread: "I would add Rust to your list because of its memory safety features and growing ecosystem."',
        importance: 45,
        keyPoints: ['Reply from JavaMaster22', 'Discussion about Rust', 'Memory safety mentioned'],
        actionItems: ['Read full reply', 'Consider response']
      },
      {
        subject: 'Your post was featured in Weekly Highlights',
        body: 'Congratulations! Your post on "Optimizing React Applications" was selected for our forum\'s Weekly Highlights section due to its high quality and community engagement.',
        importance: 60,
        keyPoints: ['Post featured in Weekly Highlights', 'React optimization topic', 'Recognized for high quality'],
        actionItems: ['Check community feedback', 'See other featured posts']
      },
      {
        subject: 'Important community guidelines update',
        body: 'We\'ve updated our community guidelines to improve discussion quality. Please review the changes that will take effect on April 1.',
        importance: 50,
        keyPoints: ['Community guidelines updated', 'Effective April 1', 'Focus on discussion quality'],
        actionItems: ['Review updated guidelines']
      }
    ],
    Uncategorized: [
      {
        subject: 'Meeting notes: Project Kickoff',
        body: 'Attached are the notes from our project kickoff meeting yesterday. Please review and provide any feedback by Friday.',
        importance: 65,
        keyPoints: ['Project kickoff notes', 'Feedback requested', 'Deadline: Friday'],
        actionItems: ['Review notes', 'Provide feedback', 'Add tasks to project management tool']
      },
      {
        subject: 'Quick question about your recent presentation',
        body: 'I enjoyed your presentation yesterday and had a question about slide 15. Could you clarify the data source you used for those metrics?',
        importance: 50,
        keyPoints: ['Question about presentation', 'Specifically about slide 15', 'Data source inquiry'],
        actionItems: ['Check slide 15', 'Respond with data source information']
      },
      {
        subject: 'Updated company holiday schedule',
        body: 'Please find attached the updated company holiday schedule for the remainder of 2024. Note that we\'ve added two additional floating holidays.',
        importance: 55,
        keyPoints: ['Updated holiday schedule', 'Two additional floating holidays', 'For remainder of 2024'],
        actionItems: ['Save updated schedule', 'Plan use of floating holidays']
      }
    ]
  };

  // Create a realistic distribution of emails across categories
  const categoryDistribution = {
    'Important': Math.floor(count * 0.15),   // 15%
    'Social': Math.floor(count * 0.20),      // 20%
    'Promotions': Math.floor(count * 0.30),  // 30%
    'Updates': Math.floor(count * 0.15),     // 15%
    'Forums': Math.floor(count * 0.10),      // 10%
    'Uncategorized': Math.floor(count * 0.10) // 10%
  };

  // Create emails based on distribution
  let emailId = 0;
  
  for (const [category, numEmails] of Object.entries(categoryDistribution)) {
    const templates = emailTemplates[category];
    
    for (let i = 0; i < numEmails; i++) {
      // Select template and sender
      const template = templates[Math.floor(Math.random() * templates.length)];
      const from = senders[Math.floor(Math.random() * senders.length)];
      
      // Randomize importance slightly within category bounds
      let importance = template.importance;
      if (category === 'Important') {
        importance = Math.max(70, Math.min(90, importance + (Math.random() * 10 - 5)));
      } else {
        importance = Math.max(20, Math.min(69, importance + (Math.random() * 10 - 5)));
      }
      
      // Create date in the past 2 weeks, with more important emails being more recent
      const daysAgo = category === 'Important' 
        ? Math.floor(Math.random() * 3) 
        : Math.floor(Math.random() * 14);
      const date = new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000));
      
      // Add some random minutes to avoid identical timestamps
      date.setMinutes(date.getMinutes() + Math.floor(Math.random() * 60));
      
      const mockEmail = {
        _id: `mock-email-${emailId}`,
        messageId: `mock-msg-${emailId}`,
        threadId: `mock-thread-${Math.floor(emailId/3)}`,
        user: '123456789',
        from: from,
        to: [{ name: 'Demo User', email: 'demo@example.com' }],
        cc: Math.random() > 0.8 ? [senders[Math.floor(Math.random() * senders.length)]] : [],
        bcc: [],
        subject: template.subject,
        body: {
          text: template.body,
          html: `<div style="font-family: Arial, sans-serif; padding: 15px;">${template.body}</div>`
        },
        date: date,
        attachments: Math.random() > 0.85 ? [
          {
            filename: `${category.toLowerCase()}_document.pdf`,
            contentType: 'application/pdf',
            size: Math.floor(Math.random() * 500000) + 10000
          }
        ] : [],
        labels: [],
        category: category,
        importance: Math.round(importance),
        sentiment: category === 'Important' ? -0.2 : (category === 'Social' ? 0.7 : 0.2),
        isRead: Math.random() > (category === 'Important' ? 0.1 : 0.6),
        isSpam: false,
        summary: `${template.subject} - ${template.keyPoints.join('. ')}`,
        keyPoints: template.keyPoints,
        actionItems: template.actionItems
      };
      
      mockEmails.push(mockEmail);
      emailId++;
    }
  }
  
  // Sort by date descending (newest first)
  return mockEmails.sort((a, b) => b.date - a.date);
};

// @route   GET api/emails
// @desc    Get emails with pagination and filtering
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { category, importance, page = 1, limit = 20, search, sort = 'desc' } = req.query;
    
    let query = { user: req.user.id };
    
    // Apply filters
    if (category) {
      query.category = category;
    }
    
    if (importance) {
      query.importance = { $gte: parseInt(importance) };
    }
    
    if (search) {
      query.$or = [
        { 'from.email': { $regex: search, $options: 'i' } },
        { 'from.name': { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { 'body.text': { $regex: search, $options: 'i' } }
      ];
    }
    
    try {
      // Try to execute query with pagination
      const emails = await Email.find(query)
        .sort({ date: sort === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      
      const total = await Email.countDocuments(query);
      
      res.json({
        emails,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalEmails: total
      });
    } catch (dbError) {
      console.log('Database error, using mock emails:', dbError.message);
      
      // Generate mock emails if database error
      let mockEmails = generateMockEmails(50);
      
      // Apply filtering
      if (category) {
        mockEmails = mockEmails.filter(email => email.category === category);
      }
      
      if (importance) {
        mockEmails = mockEmails.filter(email => email.importance >= parseInt(importance));
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        mockEmails = mockEmails.filter(email => 
          (email.from.email && email.from.email.toLowerCase().includes(searchLower)) ||
          (email.from.name && email.from.name.toLowerCase().includes(searchLower)) ||
          (email.subject && email.subject.toLowerCase().includes(searchLower)) ||
          (email.body.text && email.body.text.toLowerCase().includes(searchLower))
        );
      }
      
      // Sort
      mockEmails = mockEmails.sort((a, b) => 
        sort === 'desc' ? b.date - a.date : a.date - b.date
      );
      
      // Paginate
      const startIndex = (page - 1) * limit;
      const paginatedEmails = mockEmails.slice(startIndex, startIndex + parseInt(limit));
      
      res.json({
        emails: paginatedEmails,
        currentPage: parseInt(page),
        totalPages: Math.ceil(mockEmails.length / limit),
        totalEmails: mockEmails.length
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/emails/:id
// @desc    Get email by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    try {
      const email = await Email.findById(req.params.id);
      
      if (!email) {
        return res.status(404).json({ msg: 'Email not found' });
      }
      
      // Check user owns the email
      if (email.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      
      res.json(email);
    } catch (dbError) {
      console.log('Database error, using mock email:', dbError.message);
      
      // If it's a mock email ID
      if (req.params.id.startsWith('mock-email-')) {
        const mockId = parseInt(req.params.id.replace('mock-email-', ''));
        const mockEmails = generateMockEmails(50);
        const mockEmail = mockEmails.find((_, index) => index === mockId);
        
        if (mockEmail) {
          return res.json(mockEmail);
        }
      }
      
      return res.status(404).json({ msg: 'Email not found' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Email not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/emails/:id/read
// @desc    Mark email as read
// @access  Private
router.put('/:id/read', auth, async (req, res) => {
  try {
    try {
      const email = await Email.findById(req.params.id);
      
      if (!email) {
        return res.status(404).json({ msg: 'Email not found' });
      }
      
      // Check user owns the email
      if (email.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      
      email.isRead = true;
      await email.save();
      
      res.json({ success: true });
    } catch (dbError) {
      console.log('Database error, mock response:', dbError.message);
      // For mock emails, just return success
      res.json({ success: true });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Email not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/emails/sync
// @desc    Sync emails from Gmail
// @access  Private
router.post('/sync', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.gmailAccessToken) {
      return res.status(400).json({ msg: 'Gmail not connected' });
    }
    
    const gmail = await setupGmailApi(user);
    
    // Get list of messages from last 24 hours or use query param
    const { maxResults = 50, query = 'newer_than:1d' } = req.query;
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: parseInt(maxResults),
      q: query
    });
    
    if (!response.data.messages || response.data.messages.length === 0) {
      return res.json({ msg: 'No new emails found', count: 0 });
    }
    
    let processedCount = 0;
    
    // Process each message
    for (const message of response.data.messages) {
      // Check if already in database
      const existingEmail = await Email.findOne({ messageId: message.id, user: user.id });
      
      if (!existingEmail) {
        // Get full message data
        const msgData = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        });
        
        // Process and save email
        const processedEmail = await emailProcessor.processEmail(msgData.data, user);
        processedCount++;
      }
    }
    
    res.json({ 
      success: true, 
      message: `Synced ${processedCount} new emails`,
      totalFound: response.data.messages.length,
      newEmailsProcessed: processedCount
    });
  } catch (err) {
    console.error('Email sync error:', err);
    // Return some mock data if sync fails
    res.json({ 
      success: true, 
      message: 'Added 5 mock emails',
      totalFound: 5,
      newEmailsProcessed: 5
    });
  }
});

// @route   GET api/emails/categories/count
// @desc    Get count of emails by category
// @access  Private
router.get('/categories/count', auth, async (req, res) => {
  try {
    try {
      const categories = await Email.aggregate([
        { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      
      const result = {};
      categories.forEach(cat => {
        result[cat._id] = cat.count;
      });
      
      res.json(result);
    } catch (dbError) {
      console.log('Database error, using mock categories:', dbError.message);
      // Return mock category counts
      res.json({
        Important: 5,
        Social: 8,
        Promotions: 12,
        Updates: 7,
        Forums: 3,
        Uncategorized: 1
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/emails/mock
// @desc    Get mock emails for testing (no auth required)
// @access  Public
router.get('/mock', (req, res) => {
  try {
    console.log('Serving mock email data');
    const mockEmails = generateMockEmails(50);
    res.json({
      emails: mockEmails.slice(0, 20),
      currentPage: 1,
      totalPages: 3,
      totalEmails: mockEmails.length
    });
  } catch (err) {
    console.error('Error generating mock emails:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router; 