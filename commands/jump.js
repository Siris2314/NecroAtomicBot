const {Client, Message, MessageEmbed} = require('discord.js')
module.exports = {
  name:'jump',
  description: 'jumps to another song',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }


    let songnum = parseInt(args[0]) + 1;

    await client.music.jump(message, songnum);

    message.channel.send(`Jumped to Song # ${songnum}`)

    
}

}

