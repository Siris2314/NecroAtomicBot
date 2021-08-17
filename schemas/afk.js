const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  Guild: String,
  Member: String,
  Content: String,
  TimeAgo: String
})

module.exports = mongoose.model('afk', Schema)