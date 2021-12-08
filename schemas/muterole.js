const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Role: String
})

module.exports = mongoose.model('Mute-Role', Schema, 'Mute-Role')
