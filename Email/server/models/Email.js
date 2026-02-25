const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  threadId: {
    type: String
  },
  from: {
    name: String,
    email: String
  },
  to: [
    {
      name: String,
      email: String
    }
  ],
  cc: [
    {
      name: String,
      email: String
    }
  ],
  bcc: [
    {
      name: String,
      email: String
    }
  ],
  subject: {
    type: String
  },
  body: {
    text: String,
    html: String
  },
  date: {
    type: Date,
    required: true
  },
  attachments: [
    {
      filename: String,
      contentType: String,
      size: Number,
      fileId: String
    }
  ],
  labels: [String],
  // NLP processed fields
  category: {
    type: String,
    enum: ['Important', 'Social', 'Promotions', 'Updates', 'Forums', 'Uncategorized'],
    default: 'Uncategorized'
  },
  importance: {
    type: Number, // 0-100 score
    default: 50
  },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  isRead: {
    type: Boolean,
    default: false
  },
  summary: {
    type: String
  },
  keyPoints: [String],
  actionItems: [String],
  processedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient querying
emailSchema.index({ user: 1, date: -1 });
emailSchema.index({ user: 1, category: 1, date: -1 });
emailSchema.index({ user: 1, importance: -1 });

module.exports = mongoose.model('Email', emailSchema); 