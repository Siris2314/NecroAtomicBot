const Discord = require('discord.js');

module.exports = {

    name:'forward',
    description:'Forwards Current Track Playing by some time',

    async execute(message, args,client){
        if(!message.member.voice.channel){
            return message.channel.send('Must be in a vc to use this command')
        }

        if(!client.music.getQueue(message)){
            const embed = new MessageEmbed()
            .setTitle(`:x: **Queue Error**`)
            .setColor('RED')
            .setDescription('No Queue Currently Exists')
         return message.channel.send(embed)
        }
        if(client.music.getQueue(message) && message.member.voice.channel.id  !== message.guild.me.voice.channel.id ){
            const embed = new MessageEmbed()
            .setTitle(`:x: **Play Error**`)
            .setColor('RED')
            .setDescription('Must be in the same voice channel as me(Queue still exists)')
         return message.channel.send(embed)
        }
        if(!args[0]){
            const embed = new MessageEmbed()
            .setTitle(`:x: **Command Error**`)
            .setColor('RED')
            .setDescription('Must provide the time to forward music by')
         return message.channel.send(embed)
        }

        let queue = client.music.getQueue(message);
        let seektime = queue.currentTime + Number(args[0]) * 1000;
        if(seektime < 0)
          seektime = queue.songs[0].duration * 1000;
        if(seektime >= queue.songs[0].duration * 1000)
          seektime = queue.songs[0].duration * 1000 - 1000;

        client.music.seek(message, seektime);

        const seekembed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(`Forwarded for \`${args[0]} Seconds\` to: ${format(seektime)}`)
          .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
        return message.channel.send(seekembed);
  

        
        


    }
}

async function format(millis) {
    try{
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) 
      {
          return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      }else {
          return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      }
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  }