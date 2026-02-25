const Summary = require('../models/Summary');
const OpenAI = require('openai');

// Initialize OpenAI configuration if a valid API key is available
const apiKey = process.env.OPENAI_API_KEY;
const isValidApiKey = apiKey && apiKey !== 'your_openai_api_key';
const openai = isValidApiKey ? new OpenAI({ apiKey }) : null;

// Generate overview text for a summary
const generateOverviewText = async (emails, timeRange) => {
  // Get basic stats
  const totalEmails = emails.length;
  const importantEmails = emails.filter(email => email.importance >= 70);
  const spamEmails = emails.filter(email => email.isSpam);
  
  // Format date range
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const dateRangeText = timeRange.start.toDateString() === timeRange.end.toDateString() 
    ? `on ${formatDate(timeRange.start)}` 
    : `from ${formatDate(timeRange.start)} to ${formatDate(timeRange.end)}`;
  
  // Use OpenAI if available for better summary
  if (openai) {
    try {
      // Prepare email data for prompt
      const topEmails = importantEmails.slice(0, 5).map(email => ({
        from: email.from,
        subject: email.subject,
        summary: email.summary
      }));
      
      const prompt = `
        Generate a concise summary of email activity ${dateRangeText}.
        
        Email Statistics:
        - Total emails received: ${totalEmails}
        - Important emails: ${importantEmails.length}
        - Spam/promotional emails: ${spamEmails.length}
        
        Top important emails:
        ${topEmails.map((email, i) => 
          `${i+1}. From: ${email.from.name || email.from.email}
             Subject: ${email.subject}
             Summary: ${email.summary || 'No summary available'}`
        ).join('\n\n')}
        
        Please provide:
        1. A brief overview paragraph (2-3 sentences)
        2. Highlights of important communications
        3. Any notable patterns or insights
        
        Write in a personal, helpful tone addressing the user directly:`;
      
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 350,
        temperature: 0.7,
      });
      
      return response.choices[0].text.trim();
    } catch (err) {
      console.error('OpenAI overview generation failed:', err);
    }
  }
  
  // Fallback basic summary
  let overview = `You received ${totalEmails} emails ${dateRangeText}. `;
  
  if (importantEmails.length > 0) {
    overview += `${importantEmails.length} were marked as important. `;
  }
  
  if (spamEmails.length > 0) {
    overview += `${spamEmails.length} were identified as spam or promotional. `;
  }
  
  if (importantEmails.length > 0) {
    const topSender = importantEmails[0].from.name || importantEmails[0].from.email;
    overview += `Your most important email was from ${topSender}.`;
  }
  
  return overview;
};

// Extract action items from emails
const extractAllActionItems = (emails) => {
  const allActionItems = [];
  
  // Collect all action items from emails
  emails.forEach(email => {
    if (email.actionItems && email.actionItems.length > 0) {
      email.actionItems.forEach(item => {
        allActionItems.push(item);
      });
    }
  });
  
  // Remove duplicates and limit to the top 10
  return [...new Set(allActionItems)].slice(0, 10);
};

// Get top senders statistics
const getTopSenders = (emails) => {
  const senderCounts = {};
  
  emails.forEach(email => {
    const senderEmail = email.from.email;
    if (senderEmail) {
      senderCounts[senderEmail] = (senderCounts[senderEmail] || 0) + 1;
    }
  });
  
  // Convert to array, sort, and take top 5
  return Object.entries(senderCounts)
    .map(([email, count]) => ({ email, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

// Get sentiment breakdown
const getSentimentBreakdown = (emails) => {
  const sentiments = {
    positive: 0,
    neutral: 0,
    negative: 0
  };
  
  emails.forEach(email => {
    sentiments[email.sentiment]++;
  });
  
  return sentiments;
};

// Get busy periods by hour
const getBusyPeriods = (emails) => {
  const hourCounts = Array(24).fill(0);
  
  emails.forEach(email => {
    const hour = email.date.getHours();
    hourCounts[hour]++;
  });
  
  // Convert to format with hour and count
  return hourCounts
    .map((count, hour) => ({ hour, count }))
    .filter(period => period.count > 0)
    .sort((a, b) => b.count - a.count);
};

// Get sample emails for each category
const getSampleEmailsByCategory = (emails) => {
  // Group emails by category
  const categories = {
    Important: { count: 0, sample: [] },
    Social: { count: 0, sample: [] },
    Promotions: { count: 0, sample: [] },
    Updates: { count: 0, sample: [] },
    Forums: { count: 0, sample: [] },
    Uncategorized: { count: 0, sample: [] }
  };
  
  // Process each email
  emails.forEach(email => {
    const category = email.category;
    if (categories[category]) {
      categories[category].count++;
      
      // Add to sample if less than 3 samples or if more important than existing samples
      if (categories[category].sample.length < 3) {
        categories[category].sample.push(email._id);
      } else if (email.importance > 70) {
        // Replace least important sample
        const leastImportantIndex = categories[category].sample
          .findIndex(sampleId => {
            const sampleEmail = emails.find(e => e._id.equals(sampleId));
            return sampleEmail && sampleEmail.importance < email.importance;
          });
        
        if (leastImportantIndex !== -1) {
          categories[category].sample[leastImportantIndex] = email._id;
        }
      }
    }
  });
  
  return categories;
};

// Generate a summary from emails
const generateSummary = async (emails, user, startDate, endDate) => {
  try {
    // Sort emails by importance
    emails.sort((a, b) => b.importance - a.importance);
    
    // Generate the overview text
    const timeRange = { start: startDate, end: endDate };
    const overview = await generateOverviewText(emails, timeRange);
    
    // Extract top important emails
    const importantEmails = emails
      .filter(email => email.importance >= 70)
      .map(email => ({
        email: email._id,
        summary: email.summary,
        importance: email.importance
      }))
      .slice(0, 10);
    
    // Get emails by category
    const emailsByCategory = getSampleEmailsByCategory(emails);
    
    // Get action items
    const actionItems = extractAllActionItems(emails);
    
    // Collect metrics and insights
    const insightMetrics = {
      totalEmails: emails.length,
      importantCount: emails.filter(email => email.importance >= 70).length,
      spamCount: emails.filter(email => email.isSpam).length,
      topSenders: getTopSenders(emails),
      sentimentBreakdown: getSentimentBreakdown(emails),
      busyPeriods: getBusyPeriods(emails)
    };
    
    // Create summary document
    const summary = new Summary({
      user: user._id,
      date: new Date(),
      timeRange: {
        start: startDate,
        end: endDate
      },
      overview,
      importantEmails,
      emailsByCategory,
      actionItems,
      insightMetrics
    });
    
    await summary.save();
    return summary;
  } catch (err) {
    console.error('Summary generation error:', err);
    throw err;
  }
};

module.exports = {
  generateSummary
}; 