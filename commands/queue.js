const Discord = require('discord.js')
module.exports = {
  name:'queue',
  description: 'shows the queue of music',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    let queue = await client.distube.getQueue(message);

   if(queue){
    const embed = new Discord.MessageEmbed()
      .setTitle('Music Queue')
      .setDescription(queue)


    message.channel.send(embed)

  } else if(!queue){
    return message.channel.send("No Music Is Playing")

  }
  }
}
