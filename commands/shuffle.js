module.exports = {
  name:'shuffle',
  description: 'shuffles music',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    let queue = await client.distube.getQueue(message);

   if(queue){
    client.distube.shuffle(message);

    message.channel.send(`Shuffled Music`)
  } else if(!queue){
    return message.channel.send("No Music Is Playing")

  }
  }
}
