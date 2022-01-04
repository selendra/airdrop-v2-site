const mongoose = require('mongoose');

const WhitelistSchema = new mongoose.Schema({
  hash:  String,
  amount: String,
  Date: String,
  v: String,
  r: String,
  s: String,
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

module.exports = mongoose.model('Whitelist', WhitelistSchema);