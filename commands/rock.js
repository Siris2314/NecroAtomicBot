const Discord = require('discord.js');
const {prefix, token, bot_info} = require('../botconfig.json');

module.exports = {

  name:"rock",
  description: "Rock Paper Scissors",

  execute(message){
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    let replies = ["rock", "paper", "scissors"];
    let result = Math.floor(Math.random() * replies.length);

    let userReply = args[0];

    if(!userReply){
      return message.channel.send(`Please play an actual valid reply`)
    }
    if(!replies.includes(userReply)){
      return message.channel.send(`Only one responses`)
    }

    if(replies[result] == userReply){
      return message.channel.send("We had the same choice")
    }else if(userReply == "rock" ){
      if(replies[result] == "rock"){
        message.channel.send(`I won, I picked ${replies[result]}`)
      } else return message.channel.send(`You won, I picked ${replies[result]}`)
    } else if(userReply == "scissors"){
      if(replies[result] == "rock"){
        return message.channel.send(`I won, I picked ${replies[result]}`)
      } else return message.channel.send(`You won, I picked ${replies[result]}`)
    } else if(userReply == "paper"){
      if(replies[result] == "scissors"){
        return message.channel.send(`I won, I picked ${replies[result]}`)
      } else return message.channel.send(`You won, I picked ${replies[result]}`)
    }
  }
}
