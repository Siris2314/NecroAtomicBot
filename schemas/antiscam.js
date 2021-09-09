const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Punishment:String
})

module.exports = mongoose.model('antiscam', Schema)