const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    guildID:String,
    user:String,
    content:Array
})

module.exports = mongoose.model('warn', Schema)