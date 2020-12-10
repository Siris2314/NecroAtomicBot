const mongoose = require('mongoose')

let Schema = new mongoose.Schema({

  Guild:String,
  Cmds: Array
})

module.exports = mongoose.model('cmds', Schema)
