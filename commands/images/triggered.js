const canva  = require('canvacord')
const Discord = require('discord.js')

module.exports = {

  name: 'trigger',
  description: 'triggers a photo',

  async execute(message,args){

    let avatar = message.author.displayAvatarURL({dynamic: false, format: "png"});

    let image = await canva.Canvas.trigger(avatar);
    let triggered = new Discord.MessageAttachment(image, "triggered.gif")

    message.channel.send({files: [triggered]});


  }
}
