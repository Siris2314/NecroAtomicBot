const Discord = require('discord.js')
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


      return embedbuilder(client, message, "RANDOM", "Queue", curqueue)
  } else if(!queue){
    return message.channel.send("No Music Is Playing")

  }
  }
}


function embedbuilder(client, message, color, title, description){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
    if(title){
      embed.setTitle(title);
    }
    if(description){
      embed.setDescription(description);
    }
    return message.channel.send(embed);
}
