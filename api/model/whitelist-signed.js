const mongoose = require('mongoose');

const WhitelistSchema = new mongoose.Schema({
  hash:  String,
  amount: String,
  expiredAt: String,
  v: String,
  r: String,
  s: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Whitelist', WhitelistSchema);