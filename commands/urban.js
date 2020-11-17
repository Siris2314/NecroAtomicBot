const Discord = require('discord.js')
const urban = require('relevant-urban')

module.exports = {

  name: "urban",
  description: "searches on urban dictionary",

  async execute(message,args){

    if(!args[0]){
      return message.channel.send("Please specify the search")
    }

    let result = await urban(args[0]).catch(e => {
      return message.channel.send("Unknow phrase or word")

    })

    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(result.word)
     .setURL(result.urbanURL)
     .setDescription(`**Definition:**\n**${result.definition}**\n\n**Example:**${result.example}`)
     .addField("Author", result.author, true)


     return message.channel.send(embed)


  }
}
