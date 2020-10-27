
const Discord = require('discord.js');

module.exports={
  name: 'legal',
  description: 'Meme Legal Command',
  execute(message, args){
    message.channel.send("In case of an investigation by any federal entity or similar, I do not have any involvement with this group or with the people in it, I do not know how I am here, probably added by a third party, I do not support any actions by members of this group. Especially my own.");
  }
}
