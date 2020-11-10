const Discord = require('discord.js');


module.exports = {
  name: "audio",
  description: "Plays audio in channel",

  async execute( message,args){

    const { voice } = message.member

    if(!voice.channelID){
      message.channel.send('Must be in voice channel')

    }



    voice.channel.join()
  }


}
