const fs = require('fs');

module.exports = {

  name: 'play',
  description: 'plays recording',

  async execute(message,args,client){

    const voicechannel = message.member.voice.channel;
    if(!voicechannel){
      return message.channel.send('Please join a vc')
    }

    if(!fs.existsSync(`./recorded-${message.author.id}.pcm`)){
      return message.channel.send('Your audio is not recorded')
    }

      const connection  = await message.member.voice.channel.join()

      const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`)

      const dispatcher = connection.play(stream, {
        type: "converted",

      })

      dispatcher.on("finish", () => {
        message.member.voice.channel.leave();
        message.channel.send('Audio has finished playing')
      })
  }
}
