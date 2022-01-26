
const mongo = require('mongoose')

const Schema = new mongo.Schema({
  Guild:String,
  Channel:String,
  Background:String,
  Greeting:String,
  Message:String,
  GreetingColor:String,
  NameColor:String,
  AvatarColor:String,
  messageColor:String,
  font:String,

});

module.exports = mongo.model('custom-welcome', Schema)