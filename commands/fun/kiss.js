const Discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const anime = require('anime-actions')

module.exports = {
  name: "kiss",
  description: "Kiss another user",
  async execute(message, args,client){

   try{
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(target.id == message.author.id){
      return message.channel.send("You can't kiss yourself!")
    }
    
    let data = await Random.getAnimeImgURL("kiss")


    if(!target){
      return message.channel.send("Who Will U Kiss? 💗")
    }
    
    let embed = new Discord.MessageEmbed()
        .setImage(data)
        .setColor("#2F3136")
        .setTitle(`${message.author.username} kisses ${target.user.username} \ 💖`)
        .setTimestamp()
    
    return message.channel.send({embeds:[embed]});
  } catch(err){
    console.log(err)
    message.channel.send("404 Error, please try again.");
  }
}
}