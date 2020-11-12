const expfile = ('../expfile.json');
const Discord = require('discord.js');

module.exports = {

  name:"levelcheck",
  description:"returns level of a user",

  execute(message,args){

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

    let embed = new Discord.MessageEmbed()
      .setTitle("Level Card")
      .setColor("RED")
      .addField("Level: ", expfile[user.id].level)
      .addField("XP: ", expfile[user.id].xp+"/"+expfile[user.id].reqxp)
    message.channel.send(embed)





  }
}
