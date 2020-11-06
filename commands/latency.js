const Discord = require('discord.js');

module.exports = {

  name: "latency",
  description: "returns latency",

  execute(message,args){

    message.reply('Calculating ping....').then(resultMessage => {

      const ping = resultMessage.createdTimestamp - message.createdTimestamp


      message.reply(`Bot latency: ${ping} ms`)
    })
  }
}
