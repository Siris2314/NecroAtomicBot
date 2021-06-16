const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
  name:'snipe',
  description: 'snipes messages',

async execute(message,args,client){


  const snipes = client.snipes.get(message.channel.id)
  if(!snipes) return message.channel.send('No Messages to Snipe In This Channel')

  const snipe = +args[0] - 1 || 0

  const target = snipes[snipe]

  if(!target) return message.channel.send(`There is only ${snipes.length} messages`);

  const {msg, time, image} = target;

  message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setImage(image)
      .setDescription(msg.content)
      .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}`)
      .setColor("RANDOM")


  )

 
}
}
