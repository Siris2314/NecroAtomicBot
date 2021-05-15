const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name:'clearqueue',
    description:'Clears Music Queue',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        let queue = client.music.getQueue(message)

        if(!queue){
            const embed = new MessageEmbed()
              .setTitle(`:x: **Queue Error**`)
              .setDescription('No Queue Currently Exists')
          return message.channel.send(embed)
        }
        else{
            queue.songs = [queue.songs[0]];
            const embed = new MessageEmbed()
             .setTitle(`:white_check_mark: **Queue Cleared**`)
             .setDescription('Existing Queue has been cleared')
        
        return message.channel.send(embed)

        }

        
    }
}