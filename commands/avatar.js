const Discord = require('discord.js');

module.exports = {
  name: "Avatar",
  description:"Returns Image of User Avatar",

  execute(message,args){


    let user = message.mentions.users.first() || message.author
    let avatar = user.avatarURL({dynamic: true, size: 2048, format: 'png'})

    let embed = new Discord.messageEmbed()
      .setTitle(`${user.tag}'s Avatar'`)
      .setColor("RANDOM")
      .setImage(avatar)
      .setFooter(`Request by ${message.author.tag}`)
      .setTimestamp()




     message.channel.send(embed)
}
}
