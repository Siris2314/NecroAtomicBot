const discord = require("discord.js");
const { Random } = require("something-random-on-discord");

module.exports = {
  name: "kiss",
  description: "Kiss another user",
  async execute(message, args,client){
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    let data = await Random.getAnimeImgURL("kiss");

    let reason = args.slice(0).join(" ");

    if(!target){
      return message.reply("Who Will U Kiss? 💗")
    }
    
    let embed = new discord.MessageEmbed()
        .setImage(data)
        .setColor("RANDOM")
        .setFooter(`${message.author.username} kisses ${target.user.username} \♥`)
        .setTimestamp()
    
    return message.channel.send(embed);
  }
};