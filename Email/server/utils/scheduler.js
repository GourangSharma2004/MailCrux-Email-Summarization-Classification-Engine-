const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('../models/User');
const Email = require('../models/Email');
const { google } = require('googleapis');
const emailProcessor = require('./emailProcessor');
const summaryGenerator = require('./summaryGenerator');

// Setup Gmail API
const setupGmailApi = async (user) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  // Check if token needs refreshing
  if (user.tokenExpiryDate < new Date()) {
    try {
      oauth2Client.setCredentials({
        refresh_token: user.gmailRefreshToken
      });

      const { tokens } = await oauth2Client.refreshAccessToken();
      
      // Update tokens in database
      user.gmailAccessToken = tokens.access_token;
      user.tokenExpiryDate = new Date(Date.now() + tokens.expiry_date);
      await user.save();
    } catch (err) {
      console.error(`Token refresh failed for user ${user._id}:`, err);
      return null;
    }
  }

  oauth2Client.setCredentials({
    access_token: user.gmailAccessToken,
    refresh_token: user.gmailRefreshToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
};

// Sync emails for a user
const syncUserEmails = async (user) => {
  try {
    console.log(`Syncing emails for user: ${user.email}`);
    
    // Setup Gmail API
    const gmail = await setupGmailApi(user);
    if (!gmail) {
      console.error(`Could not setup Gmail API for user: ${user.email}`);
      return false;
    }
    
    // Get list of messages from last 6 hours
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 50,
      q: 'newer_than:6h'
    });
    
    if (!response.data.messages || response.data.messages.length === 0) {
      console.log(`No new emails for user: ${user.email}`);
      return true;
    }
    
    console.log(`Found ${response.data.messages.length} new emails for user: ${user.email}`);
    
    let processedCount = 0;
    
    // Process each message
    for (const message of response.data.messages) {
      // Check if already in database
      const existingEmail = await Email.findOne({ 
        messageId: message.id, 
        user: user._id 
      });
      
      if (!existingEmail) {
        // Get full message data
        const msgData = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        });
        
        // Process and save email
        const processedEmail = await emailProcessor.processEmail(msgData.data, user);
        
        if (processedEmail) {
          processedCount++;
        }
      }
    }
    
    console.log(`Processed ${processedCount} new emails for user: ${user.email}`);
    return true;
  } catch (err) {
    console.error(`Email sync failed for user: ${user.email}`, err);
    return false;
  }
};

// Generate daily summary for a user
const generateDailySummary = async (user) => {
  try {
    console.log(`Generating daily summary for user: ${user.email}`);
    
    // Calculate time range (last 24 hours)
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 1);
    
    // Get emails in the time range
    const emails = await Email.find({
      user: user._id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ importance: -1 });
    
    if (emails.length === 0) {
      console.log(`No emails found for summary for user: ${user.email}`);
      return false;
    }
    
    // Generate the summary
    const summary = await summaryGenerator.generateSummary(emails, user, startDate, endDate);
    console.log(`Summary generated for user: ${user.email}`);
    
    return true;
  } catch (err) {
    console.error(`Summary generation failed for user: ${user.email}`, err);
    return false;
  }
};

// Schedule email synchronization (every 30 minutes)
cron.schedule('*/30 * * * *', async () => {
  console.log('Running scheduled email sync...');
  
  try {
    // Get all users with Gmail connected
    const users = await User.find({
      gmailAccessToken: { $exists: true, $ne: null },
      gmailRefreshToken: { $exists: true, $ne: null }
    });
    
    console.log(`Found ${users.length} users with Gmail connected`);
    
    // Sync emails for each user
    for (const user of users) {
      await syncUserEmails(user);
    }
  } catch (err) {
    console.error('Scheduled email sync failed:', err);
  }
});

// Schedule daily summary generation
cron.schedule('0 8 * * *', async () => {
  console.log('Running daily summary generation...');
  
  try {
    // Get all users with daily summary enabled
    const users = await User.find({
      'preferences.dailySummary': true,
      gmailAccessToken: { $exists: true, $ne: null }
    });
    
    console.log(`Found ${users.length} users with daily summary enabled`);
    
    // Generate summary for each user
    for (const user of users) {
      await generateDailySummary(user);
    }
  } catch (err) {
    console.error('Daily summary generation failed:', err);
  }
});

// Also add a custom time scheduler for users who set specific times
// This runs every hour and checks if any user has a summary time for this hour
cron.schedule('0 * * * *', async () => {
  const currentHour = new Date().getHours();
  const timeString = `${currentHour.toString().padStart(2, '0')}:00`;
  
  try {
    // Find users who want their summary at this hour
    const users = await User.find({
      'preferences.dailySummary': true,
      'preferences.summaryTime': timeString,
      gmailAccessToken: { $exists: true, $ne: null }
    });
    
    if (users.length > 0) {
      console.log(`Generating summaries for ${users.length} users at custom time ${timeString}`);
      
      // Generate summary for each user
      for (const user of users) {
        await generateDailySummary(user);
      }
    }
  } catch (err) {
    console.error(`Custom time summary generation failed for hour ${currentHour}:`, err);
  }
});

console.log('Email processor scheduler initialized'); 