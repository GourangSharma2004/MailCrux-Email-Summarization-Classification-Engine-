const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeRange: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  overview: {
    type: String,
    required: true
  },
  importantEmails: [
    {
      email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Email'
      },
      summary: String,
      importance: Number
    }
  ],
  emailsByCategory: {
    Important: {
      count: Number,
      sample: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Email'
        }
      ]
    },
    Social: {
      count: Number,
      sample: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Email'
        }
      ]
    },
    Promotions: {
      count: Number,
      sample: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Email'
        }
      ]
    },
    Updates: {
      count: Number,
      sample: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Email'
        }
      ]
    },
    Forums: {
      count: Number,
      sample: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Email'
        }
      ]
    },
    Uncategorized: {
      count: Number,
      sample: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Email'
        }
      ]
    }
  },
  actionItems: [String],
  insightMetrics: {
    totalEmails: Number,
    importantCount: Number,
    spamCount: Number,
    topSenders: [
      {
        email: String,
        count: Number
      }
    ],
    sentimentBreakdown: {
      positive: Number,
      neutral: Number,
      negative: Number
    },
    busyPeriods: [
      {
        hour: Number,
        count: Number
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound indices for efficient querying
summarySchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Summary', summarySchema); 