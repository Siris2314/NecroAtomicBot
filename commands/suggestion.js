const Discord = require('discord.js')

module.exports = {
  name:"suggestion",
  description:"Suggestion Command",

  execute(message,args){

    if(!args.length){
      return message.channel.send("Please give a suggestion")
    }

    let channel = message.guild.channel.cache.find((x) =>

     (x.name == "suggestion" || x.name == "suggestions"))

    if(!channel){
      return message.channel.send("There is no channel for suggestions")
    }

    let embed = new Discord.MessageEmbed()
     .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
     .setThumbnail(message.author.avatarURL())
     .setColor("RANDOM")
     .setDescription(args.join(" "))



    message.channel.send(embed).then(m => {
      m.react("✅")
      m.react("❎")
    })

    message.channel.send("Send your suggestion to " +  channel)
  }


}
