
const Discord = require('discord.js');

module.exports={
  name: 'legal',
  description: 'Meme Legal Command',
  async execute(message, args){
    const attachment = new Discord.MessageAttachment(
      "legal.png"
      
      );
  
    message.channel.send(attachment)
  }
}
