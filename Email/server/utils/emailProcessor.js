const natural = require('natural');
const Email = require('../models/Email');
const OpenAI = require('openai');

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

// Initialize OpenAI configuration if a valid API key is available
const apiKey = process.env.OPENAI_API_KEY;
const isValidApiKey = apiKey && apiKey !== 'your_openai_api_key';
const openai = isValidApiKey ? new OpenAI({ apiKey }) : null;

// Extract email data from Gmail API response
const extractEmailData = (message) => {
  const headers = message.payload.headers;
  const parts = message.payload.parts || [];
  
  // Extract headers
  const getHeader = (name) => {
    const header = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
    return header ? header.value : null;
  };
  
  // Parse email addresses
  const parseEmailAddresses = (addressString) => {
    if (!addressString) return [];
    
    // Simple parsing for format: "Name <email@example.com>"
    const addresses = addressString.split(',').map(addr => {
      const match = addr.trim().match(/^(?:"?([^"]*)"?\s+)?<?([^\s>]+@[^\s>]+)>?$/);
      if (match) {
        return {
          name: match[1] || '',
          email: match[2]
        };
      }
      return { name: '', email: addr.trim() };
    });
    
    return addresses;
  };
  
  // Extract body content
  const getBody = () => {
    const textPart = parts.find(part => part.mimeType === 'text/plain');
    const htmlPart = parts.find(part => part.mimeType === 'text/html');
    
    let text = '';
    let html = '';
    
    if (textPart && textPart.body && textPart.body.data) {
      text = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
    } else if (message.payload.body && message.payload.body.data) {
      text = Buffer.from(message.payload.body.data, 'base64').toString('utf-8');
    }
    
    if (htmlPart && htmlPart.body && htmlPart.body.data) {
      html = Buffer.from(htmlPart.body.data, 'base64').toString('utf-8');
    } else if (message.payload.mimeType === 'text/html' && message.payload.body.data) {
      html = Buffer.from(message.payload.body.data, 'base64').toString('utf-8');
    }
    
    return { text, html };
  };
  
  // Extract attachments info
  const getAttachments = () => {
    const attachments = [];
    
    const processAttachmentParts = (parts) => {
      if (!parts) return;
      
      parts.forEach(part => {
        if (part.filename && part.filename.length > 0) {
          attachments.push({
            filename: part.filename,
            contentType: part.mimeType,
            size: part.body.size || 0,
            fileId: part.body.attachmentId || null
          });
        }
        
        // Process nested parts
        if (part.parts) {
          processAttachmentParts(part.parts);
        }
      });
    };
    
    processAttachmentParts(parts);
    return attachments;
  };
  
  // Build email object
  const from = parseEmailAddresses(getHeader('from'))[0] || { name: '', email: '' };
  const to = parseEmailAddresses(getHeader('to'));
  const cc = parseEmailAddresses(getHeader('cc'));
  const bcc = parseEmailAddresses(getHeader('bcc'));
  const subject = getHeader('subject') || '';
  const date = new Date(getHeader('date') || message.internalDate);
  const body = getBody();
  const attachments = getAttachments();
  const messageId = message.id;
  const threadId = message.threadId;
  
  // Extract Gmail labels
  const labels = message.labelIds || [];
  
  return {
    messageId,
    threadId,
    from,
    to,
    cc,
    bcc,
    subject,
    body,
    date,
    attachments,
    labels
  };
};

// Categorize email using natural language processing
const categorizeEmail = async (emailData) => {
  // Simple rule-based categorization
  const { from, subject, body } = emailData;
  const text = (subject + ' ' + (body.text || '')).toLowerCase();
  
  // Sample rules (would be more sophisticated in production)
  const patterns = {
    social: ['facebook', 'twitter', 'linkedin', 'instagram', 'invitation', 'connect', 'friend', 'network', 'social'],
    promotions: ['offer', 'discount', 'sale', 'promo', 'deal', 'subscription', 'newsletter', 'marketing', 'off', '%'],
    updates: ['update', 'notification', 'alert', 'confirm', 'receipt', 'statement', 'account', 'security', 'verify'],
    forums: ['forum', 'community', 'discussion', 'reply', 'thread', 'post', 'comment', 'group']
  };
  
  for (const [category, keywords] of Object.entries(patterns)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      switch(category) {
        case 'social': return 'Social';
        case 'promotions': return 'Promotions';
        case 'updates': return 'Updates';
        case 'forums': return 'Forums';
      }
    }
  }
  
  // For more accurate categorization, use OpenAI if available
  if (openai) {
    try {
      const prompt = `
        Categorize the following email into one of these categories: Important, Social, Promotions, Updates, Forums
        
        From: ${from.name} <${from.email}>
        Subject: ${subject}
        Body: ${body.text ? body.text.substring(0, 500) : ''}
        
        Category:`;
      
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 10,
        temperature: 0,
      });
      
      const category = response.choices[0].text.trim();
      if (['Important', 'Social', 'Promotions', 'Updates', 'Forums'].includes(category)) {
        return category;
      }
    } catch (err) {
      console.error('OpenAI categorization failed:', err);
    }
  }
  
  // Default to Important for personal emails, otherwise Uncategorized
  if (from.email.includes('@gmail.com') || from.email.includes('@yahoo.com') || from.email.includes('@outlook.com')) {
    return 'Important';
  }
  
  return 'Uncategorized';
};

// Calculate importance score (0-100)
const calculateImportance = (emailData, category) => {
  let score = 50; // Default score
  
  // Text-based scoring
  const text = `${emailData.subject} ${emailData.body.text || ''}`;
  const tokens = tokenizer.tokenize(text.toLowerCase());
  
  // Important keywords that might indicate urgency or importance
  const importantKeywords = ['urgent', 'important', 'asap', 'deadline', 'required', 'attention', 'immediate', 'critical', 'priority'];
  const importantCount = tokens.filter(token => importantKeywords.includes(token)).length;
  
  // Adjust score based on category
  if (category === 'Important') score += 20;
  if (category === 'Promotions') score -= 20;
  
  // Adjust for urgency keywords
  score += importantCount * 5;
  
  // Adjust for personalization (fewer recipients = more important)
  if (emailData.to.length <= 1) score += 10;
  if (emailData.to.length > 10) score -= 10;
  
  // Adjust for direct emails vs. mailing lists
  if (!emailData.from.email.includes('noreply') && 
      !emailData.from.email.includes('newsletter') && 
      !emailData.from.email.includes('marketing')) {
    score += 10;
  }
  
  // Cap score between 0-100
  return Math.min(Math.max(score, 0), 100);
};

// Analyze sentiment (positive, neutral, negative)
const analyzeSentiment = (text) => {
  if (!text) return 'neutral';
  
  const tokens = tokenizer.tokenize(text);
  const sentimentScore = analyzer.getSentiment(tokens);
  
  if (sentimentScore > 0.2) return 'positive';
  if (sentimentScore < -0.2) return 'negative';
  return 'neutral';
};

// Extract key points and action items
const extractKeyPointsAndActions = async (text) => {
  if (!text || text.length < 10) {
    return { keyPoints: [], actionItems: [] };
  }
  
  // Use OpenAI if available for better extraction
  if (openai) {
    try {
      const prompt = `
        Email text:
        ${text.substring(0, 1000)}
        
        Extract the following from the email:
        1. Key points (maximum 3)
        2. Action items or requests (if any)
        
        Format:
        Key Points:
        - point 1
        - point 2
        - point 3
        
        Action Items:
        - action 1
        - action 2`;
      
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 200,
        temperature: 0.3,
      });
      
      const result = response.choices[0].text.trim();
      
      // Parse the OpenAI response
      const keyPointsMatch = result.match(/Key Points:([\s\S]*?)(?:Action Items:|$)/i);
      const actionItemsMatch = result.match(/Action Items:([\s\S]*?)$/i);
      
      const keyPoints = keyPointsMatch ? 
        keyPointsMatch[1].split('-').map(point => point.trim()).filter(Boolean) : [];
      
      const actionItems = actionItemsMatch ? 
        actionItemsMatch[1].split('-').map(item => item.trim()).filter(Boolean) : [];
      
      return { keyPoints, actionItems };
    } catch (err) {
      console.error('OpenAI extraction failed:', err);
    }
  }
  
  // Fallback basic extraction
  const sentences = text.split(/[.!?]/).filter(s => s.length > 10);
  const keyPoints = sentences.slice(0, 3).map(s => s.trim());
  
  const actionItems = sentences
    .filter(s => 
      s.toLowerCase().includes('please') || 
      s.toLowerCase().includes('could you') || 
      s.toLowerCase().includes('need to') ||
      s.toLowerCase().includes('action') ||
      s.toLowerCase().includes('required')
    )
    .slice(0, 3)
    .map(s => s.trim());
  
  return { keyPoints, actionItems };
};

// Generate a summary of the email
const summarizeEmail = async (text) => {
  if (!text || text.length < 50) return text;
  
  // Use OpenAI if available
  if (openai) {
    try {
      const prompt = `
        Summarize this email in one or two sentences:
        ${text.substring(0, 1500)}
        
        Summary:`;
      
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.3,
      });
      
      return response.choices[0].text.trim();
    } catch (err) {
      console.error('OpenAI summarization failed:', err);
    }
  }
  
  // Fallback basic summarization
  const sentences = text.split(/[.!?]/).filter(s => s.length > 10);
  return sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '');
};

// Process an email from Gmail API and store in database
const processEmail = async (message, user) => {
  try {
    // Extract basic email data
    const emailData = extractEmailData(message);
    
    // Skip emails without valid data
    if (!emailData.from || !emailData.date) {
      console.warn('Skipping email with invalid data');
      return null;
    }
    
    // Check for duplicates
    const existing = await Email.findOne({ 
      messageId: emailData.messageId,
      user: user._id
    });
    
    if (existing) {
      console.log('Email already processed:', emailData.messageId);
      return existing;
    }
    
    // Process with NLP
    const category = await categorizeEmail(emailData);
    const importance = calculateImportance(emailData, category);
    const sentiment = analyzeSentiment(emailData.body.text);
    const { keyPoints, actionItems } = await extractKeyPointsAndActions(emailData.body.text);
    const summary = await summarizeEmail(emailData.body.text);
    
    // Check if it's spam
    const isSpam = emailData.labels.includes('SPAM') || 
                  category === 'Promotions' && importance < 30;
    
    // Create new email record
    const email = new Email({
      user: user._id,
      messageId: emailData.messageId,
      threadId: emailData.threadId,
      from: emailData.from,
      to: emailData.to,
      cc: emailData.cc,
      bcc: emailData.bcc,
      subject: emailData.subject,
      body: emailData.body,
      date: emailData.date,
      attachments: emailData.attachments,
      labels: emailData.labels,
      category,
      importance,
      sentiment,
      isSpam,
      isRead: emailData.labels.includes('READ'),
      summary,
      keyPoints,
      actionItems
    });
    
    await email.save();
    return email;
  } catch (err) {
    console.error('Email processing error:', err);
    return null;
  }
};

module.exports = {
  processEmail,
  extractEmailData,
  categorizeEmail,
  calculateImportance,
  analyzeSentiment,
  summarizeEmail,
  extractKeyPointsAndActions
}; 