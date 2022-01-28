const mongoose = require('mongoose');

const WhitelistSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true
  },
  attempt: {
    type: Number,
    default: 1
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})

WhitelistSchema.set('timestamps', true);

module.exports = mongoose.model('Whitelist', WhitelistSchema);