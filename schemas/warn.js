const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    guildid:String,
    user:String,
    content:Array
})

module.exports = mongoose.model('warn', Schema)