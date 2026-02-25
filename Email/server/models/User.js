const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    }
  },
  googleId: {
    type: String
  },
  profilePicture: {
    type: String
  },
  gmailRefreshToken: {
    type: String
  },
  gmailAccessToken: {
    type: String
  },
  tokenExpiryDate: {
    type: Date
  },
  preferences: {
    dailySummary: {
      type: Boolean,
      default: true
    },
    summaryTime: {
      type: String,
      default: "08:00"
    },
    filterPriority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    categories: {
      type: [String],
      default: ['Important', 'Social', 'Promotions', 'Updates']
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema); 