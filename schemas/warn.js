const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId:String,
    guildID:String,
    moderatiorId: String,
    reason:String,
    timestamp:String
})

module.exports = mongoose.model('warn', Schema)