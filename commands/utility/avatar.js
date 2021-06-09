const Discord = require("discord.js");


module.exports = {
  name: "avatar",
  description:'Returns Avatar of a User',
  async execute(message, args) {
    let question = args[0];
    if (message.mentions.users.size) {
      let member = message.mentions.users.first();
      if (member) {
        message.delete();
        const embed = new Discord.MessageEmbed()
          .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }))
          .setTitle(member.username + `'s Avatar`)
          .setColor("RANDOM")
          .setFooter(`Requested by: ${message.author.tag}`)
          .setTimestamp();
        return message.channel.send(embed);
      } else {
        message.delete();
        message.channel.send("Sorry none found with that name");
      }
    } else {
      message.delete();
      const embed = new Discord.MessageEmbed()
        .setImage(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTitle(message.author.username + `'s Avatar`)
        .setColor("RANDOM")
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
      message.channel.send(embed);
    }
  },
}