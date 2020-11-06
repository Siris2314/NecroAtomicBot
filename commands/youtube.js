const ytsr = require('ytsr')
const Discord = require('discord.js')


module.exports = {
  name:"youtube",
  description: "Returns Youtube Link",

  async execute(message,args){

    const query = args.join(" ");

    if(!query){
      return message.channel.send("Provide a search please")
    }

    const res = await ytsr(query).catch(e => {
      return message.channel.send("No results found!");
    });

    const video = res.items.filter(i => i.type === "video")[0];
    if(!video){
      return message.channel.send("No results");
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(video.title)
      .setImage(video.thumbnail)

    message.channel.send(embed)
  }
};
