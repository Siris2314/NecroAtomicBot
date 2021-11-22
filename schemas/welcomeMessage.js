
const mongo = require('mongoose')

const Schema = new mongo.Schema({
  Guild:String,
  Channel:String,
  RulesChannel:String,
  RolesChannel:String,
  ModeratorTag:String,
  AdminTag:String
});

module.exports = mongo.model('welcome-message', Schema)