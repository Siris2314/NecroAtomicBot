const Discord = require("discord.js");
const { Random } = require("something-random-on-discord");

module.exports = {
  name: "hug",
  description: "Hug another user",
  async execute(message, args,client){
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    let data = await Random.getAnimeImgURL("hug");

    if(!target){
      return message.channel.send("Who Will U Hug? 💗")
    }
    
    let embed = new Discord.MessageEmbed()
        .setImage(data)
        .setColor("#2F3136")
        .setTitle(`${message.author.username} Hugs ${target.user.username} \ 💖`)
        .setTimestamp()
    
    return message.channel.send(embed);
  }
};