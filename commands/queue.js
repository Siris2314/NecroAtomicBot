module.exports = {
  name:'queue',
  description: 'shows queue of music',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    let queue = await client.distube.getQueue(message);

   if(queue){
     let curqueue = queue.songs.map((song, id) =>
       `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
       ).join("\n");
      message.channel.send(curqueue);
  } else if(!queue){
    return message.channel.send("No Music Is Playing")

  }
  }
}
