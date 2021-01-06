const Discord = require('discord.js')

module.exports = {

  name: 'poll',
  description: 'creates a poll',

async execute(message,args,client){
  const pollChannel = message.mentions.channels.first()

  if(!pollChannel){
    return message.channel.send("Please mention a channel")
  }

  const question = args.join(" ").slice(21)
  if(!question){
    return message.channel.send("Please mention a question")
  }

  const e = new Discord.MessageEmbed()
  .setTitle('Poll')
  .setDescription( `${question}`)
  .addField('Author: ', message.author)
  .setColor('RANDOM')
  let msg = await pollChannel.send(e)
  await msg.react('👍')
  await msg.react('👎')
  message.channel.send('Poll Created')
 }
}
