const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Guild:String,
    User: String,
    Reason: String,
    Date: Number
})

module.exports = mongoose.model('afk', Schema)