const {Client, Message, MessageEmbed} = require('discord.js')
module.exports = {
  name:'jump',
  description: 'jumps to another song',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    let queue = client.music.getQueue(message);
    let songnum = parseInt(args[0]);
    if(!queue){
      const embed = new MessageEmbed()
        .setTitle(`:x: **Queue Error**`)
        .setDescription('No Queue Currently Exists')
    return message.channel.send(embed)
  }

  if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {


    const jumpembed = new MessageEmbed()
      .setTitle(`:white_check_mark: **Jumped Songs**`)
      .setDescription(`Jumped to ${songnum} songs`)

    await client.music.jump(message, songnum);

    return message.channel.send(jumpembed);




  }
  else{
    const errorembed = new MessageEmbed()
    .setTitle(`:x: **Length Error**`)
    .setDescription(`Invalid Song Number, please enter a number between 1 and ${client.music.getQueue(message).length}`)

   return message.channel.send(errorembed)

  }


    
}

}

