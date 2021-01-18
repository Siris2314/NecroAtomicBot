const Discord = require('discord.js')

module.exports = {
  name:'snipe',
  description: 'snipes messages',

  async execute(message,args,client){
    const msg = client.snipes.get(message.channel.id);
    if(!msg){
      return message.channel.send('No message to snipe')
    }
    const snipeEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setDescription(msg.content)

    message.channel.send(snipeEmbed)
  }
}
