const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
})

module.exports = mongoose.model('antiraid', Schema)
