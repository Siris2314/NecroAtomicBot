const Discord = require('discord.js')
module.exports = {
  name:'jump',
  description: 'jumps to another song',

  async execute(message, args, client){

    if(!message.member.voice.channel){
      return message.channel.send('Must be in a vc to use this command')
    }

    let queue = await client.distube.getQueue(message);

    if(0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length){
        embedbuilder(client, message, "RANDOM", "Jumper", `Jumped ${parseInt(args[0])} songs!`)
         return distube.jump(message, parseInt(args[0]))

     } .catch(err => message.channel.send("Invalid song number."));
     else{
         embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **${client.distube.getQueue(message).length}** `)
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
