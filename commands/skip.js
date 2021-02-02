module.exports = {
  name:'skip',
  description: 'skip music',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    let queue = await client.distube.getQueue(message);

   if(queue){
    client.distube.skip(message)

    message.channel.send(`Skipped to next song, `)
  } else if(!queue){
    return message.channel.send("No Music Is Playing")

  }
  }
}
