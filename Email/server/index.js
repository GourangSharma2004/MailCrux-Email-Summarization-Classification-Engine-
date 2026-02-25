const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Routes
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB:', err);
    console.log('Starting server without database connection. Authentication will not work.');
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/summaries', summaryRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Use port 8081 to match client proxy setting
const PORT = 8081;

// Start server with error handling for port conflicts
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const altPort = 8082;
      console.error(`Port ${PORT} is already in use. Trying alternative port ${altPort}`);
      // Try alternative port
      app.listen(altPort, () => {
        console.log(`Server running on alternative port ${altPort}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });

// Schedule email processing tasks
require('./utils/scheduler'); 