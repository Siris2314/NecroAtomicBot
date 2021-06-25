const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Guild:String
})

module.exports = mongoose.model('ghostping', Schema)