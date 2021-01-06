const fs = require('fs')

module.exports = {

  name: 'record',
  description:'records vc',

  async execute(message,args,client) {

    const voicechannel = message.member.voice.channel;
    if(!voicechannel){
      return message.channel.send('Please join a vc')
    }

    const connection  = await message.member.voice.channel.join()

    const receiver = connection.receiver.createStream(message.member, {
      mode: "pcm",
      end: "silence"
    })

    const writer = receiver.pipe(fs.createWriteStream("./recorded.pcm"))
    writer.on("finish", () => {

      message.member.voice.channel.leave();
      message.channel.send('Finishing Writing Audio')
    })


  }


}
