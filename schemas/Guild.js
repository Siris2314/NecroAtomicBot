const mongo = require('mongooe')

module.exports = mongo.model('Guild', new mongo.Schema({

  id: String,
  Current: Number,
  channel: String
}))
