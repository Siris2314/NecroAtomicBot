const Discord = require('discord.js');

module.exports = {
  name: "avatar",
  description:"Returns Image of User Avatar",

  execute(message,args){

    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({size: 1024})

    const embed = new Discord.MessageEmbed()
      .setTitle(`${member.username} avatar`)
      .setImage(avatar)

    message.channel.send(embed)

  }
}
