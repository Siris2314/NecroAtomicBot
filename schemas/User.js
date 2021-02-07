const mongo = require('mongooe')

module.exports = mongo.model('Users', new mongo.Schema({

  id: String,
  Guild: String,
  Counts: Number
}))
