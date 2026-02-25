const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { google } = require('googleapis');
const User = require('../models/User');
const auth = require('../middleware/auth');

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Create JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth
// @desc    Get user data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/google
// @desc    Google OAuth login URL
// @access  Public
router.get('/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.labels'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  res.json({ url });
});

// @route   GET api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });
    
    const userInfo = await oauth2.userinfo.get();
    
    // Check if user exists
    let user = await User.findOne({ email: userInfo.data.email });
    
    if (user) {
      // Update existing user
      user.googleId = userInfo.data.id;
      user.profilePicture = userInfo.data.picture;
      user.gmailRefreshToken = tokens.refresh_token || user.gmailRefreshToken;
      user.gmailAccessToken = tokens.access_token;
      user.tokenExpiryDate = new Date(Date.now() + tokens.expiry_date);
    } else {
      // Create new user
      user = new User({
        name: userInfo.data.name,
        email: userInfo.data.email,
        googleId: userInfo.data.id,
        profilePicture: userInfo.data.picture,
        gmailRefreshToken: tokens.refresh_token,
        gmailAccessToken: tokens.access_token,
        tokenExpiryDate: new Date(Date.now() + tokens.expiry_date)
      });
    }

    await user.save();

    // Create JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }, 
      (err, token) => {
        if (err) throw err;
        // Redirect to frontend with token
        res.redirect(`http://localhost:3001/auth-callback?token=${token}`);
      }
    );
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('Authentication failed');
  }
});

// @route   POST api/auth/google/callback
// @desc    Google OAuth callback (POST version)
// @access  Public
router.post('/google/callback', async (req, res) => {
  const { code } = req.body;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });
    
    const userInfo = await oauth2.userinfo.get();
    
    // Check if user exists
    let user = await User.findOne({ email: userInfo.data.email });
    
    if (user) {
      // Update existing user
      user.googleId = userInfo.data.id;
      user.profilePicture = userInfo.data.picture;
      user.gmailRefreshToken = tokens.refresh_token || user.gmailRefreshToken;
      user.gmailAccessToken = tokens.access_token;
      user.tokenExpiryDate = new Date(Date.now() + tokens.expiry_date);
    } else {
      // Create new user
      user = new User({
        name: userInfo.data.name,
        email: userInfo.data.email,
        googleId: userInfo.data.id,
        profilePicture: userInfo.data.picture,
        gmailRefreshToken: tokens.refresh_token,
        gmailAccessToken: tokens.access_token,
        tokenExpiryDate: new Date(Date.now() + tokens.expiry_date)
      });
    }

    await user.save();

    // Create JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }, 
      (err, token) => {
        if (err) throw err;
        // Return token directly for POST requests
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).json({ msg: 'Authentication failed' });
  }
});

// @route   PUT api/auth/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update preferences
    user.preferences = {
      ...user.preferences,
      ...req.body
    };

    await user.save();
    res.json(user.preferences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/mock-login
// @desc    Mock authentication for testing (no DB required)
// @access  Public
router.post('/mock-login', (req, res) => {
  const { email } = req.body;
  
  try {
    // Create a mock user with the provided email
    const mockUser = {
      id: '123456789',
      name: email === 'tmkoc3796@gmail.com' ? 'Golu Sharma' : 'Demo User',
      email: email || 'demo@example.com',
      preferences: {
        emailSyncFrequency: 'daily',
        autoCategorizationEnabled: true,
        summaryFrequency: 'weekly',
        notificationsEnabled: true
      }
    };
    
    // Create JWT
    const payload = {
      user: {
        id: mockUser.id
      }
    };
    
    jwt.sign(
      payload, 
      process.env.JWT_SECRET || 'mockjwtsecret', 
      { expiresIn: '7d' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add mock auth middleware handler
router.get('/mock-auth', (req, res) => {
  // Return a mock user
  res.json({
    id: '123456789',
    name: 'Demo User',
    email: 'demo@example.com',
    preferences: {
      emailSyncFrequency: 'daily',
      autoCategorizationEnabled: true,
      summaryFrequency: 'weekly',
      notificationsEnabled: true
    }
  });
});

module.exports = router; 