module.exports = {
  name:'volume',
  description: 'sets volume of music',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    args[1] =  message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift();

    let queue = await client.distube.getQueue(message);

   if(queue){
    client.distube.setVolume(message, cmd)

    message.channel.send(`Volume changed to ${args[1]}`)
  } else if(!queue){
    return message.channel.send("No Music Is Playing")

  }
  }
}
