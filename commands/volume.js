module.exports = {
  name:'volume',
  description: 'sets volume of music',

  async execute(message, args,, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    let args[1] =  message.content.slice(config.prefix.length).trim().split(/ +/g);

    let queue = await client.distube.getQueue(message);

   if(queue){
    client.distube.setVolume(message, args[1])

    message.channel.send(`Volume changed to ${args[1]}`)
  } else if(!queue){
    return message.channel.send("No Music Is Playing")

  }
  }
}
