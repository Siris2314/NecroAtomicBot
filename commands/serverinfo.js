const Discord = require('discord.js')

module.exports = {

  name:"serverinfo",
  description: "returns info of server",


  execute(message,args){

  const roles = message.guild.roles.cache;
  const members = message.guild.members.cache;
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;

  const embed = new Discord.MessageEmbed()
    .setDescription(`**Guild Information for __${message.guild.name}__**`)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    .addField('General', [
      `**> Name: **${message.guild.name}`,
      `**> ID: **${message.guild.ID}`,
      `**> Owner: **${message.guild.owner.user.tag}`,
      `**> Region: **${message.guild.region}`,
      `**> Boost Tier: **${message.guild.premiumTier}`,
      `**> Time Created: **${message.guild.createdTimestamp}`,
      ])
      .addField('Stats', [
        `**> Role Count: **${roles.length}`,
        `**> Emoji Count: **${emojis.size}`,
        `**> Member Count: **${message.guild.memberCount}`,
        `**> Humans: **${members.filter(member => !member.user.bot).size}`
        `**> Bots: **${members.filter(member => member.user.bot).size}`
      ])

    return message.channel.send(embed);

 }
}
