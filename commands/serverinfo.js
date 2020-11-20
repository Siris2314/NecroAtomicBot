const Discord = require('discord.js')

module.exports = {

  name:"serverinfo",
  description: "returns info of server",


  execute(message,args){

    const roles = message.guild.roles.cache;
    const emojis = message.guild.emojis.cache;
    const embed = new Discord.MessageEmbed()
        .setDescription(`**Guild Information for __${message.guild.name}__**`)
        .setColor("#0020ff")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("General", [
            `**> Name: **${message.guild.name}`,
            `**> ID: **${message.guild.id}`,
            `**> Owner: **<@${message.guild.ownerID}>`,
            `**> Region: **${message.guild.region}`,
            `**> Boost Tier: **${message.guild.premiumTier}`,
            `**> Time Created: **${new Date(message.guild.createdTimestamp)}`,
        ])
        .addField("Stats", [
            `**> Role Count: **${roles.array().length}`,
            `**> Emoji Count: **${emojis.size}`,
            `**> Member Count: **${message.guild.memberCount}`,
        ]);
    return message.channel.send(embed);

  }
}
