const Discord = require('discord.js')
const request = require('node-superfetch')


module.exports = {
  name: "reddit",
  description: "Reddit Command",

  async execute(message,args){

    try{
      let user = args[0];
      if(!user){
        return message.channel.send("Please input the username")
      }

      const {body} = await request.get(`https://www.reddit.com/user/${user}/about.json`);
      const {data} = body;

      if(data.hide_from_robots){
        return message.channel.send("User is hidden")
      }

      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(data.icon_img.replace(/(amp;)/gi,""))
        .setTitle(`/u/${data.name}`)
        .addField("Username",data.name,true)
        .addField("ID", data.id, true)
        .addField("Karma", Number(data.total_karma), true)
        .addField("Date Created", require("moment").utc(data.created_utc * 1000).format("MM/DD/YYYY h:mm A"), true)

      return message.channel.send(embed)

    }catch(error){
      if(error.status === 404){
        return message.channel.send("User not found")

      }

      return message.channel.send(`An error occured: **${error.message}**`)

    }
  }
}
