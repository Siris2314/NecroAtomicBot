const Discord = require('discord.js')

module.exports = {
  name:"suggestion",
  description:"Suggestion Command",

  async execute(message,args,client){
    const suggestionQuery = args.join(" ");

    if(!suggestionQuery){
      return message.channel.send(`Please specify a suggestion to give`)
    }

    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`**Suggestion**: ${suggestionQuery}`)
      .setColor('RANDOM')
      .setTimestamp()
      .addField("Status", "PENDING")

    message.channel.send('Submitted Suggestion')
    message.guild.channels.cache.get('808788381407641641').send(embed)




}
}
