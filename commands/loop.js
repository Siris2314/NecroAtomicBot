const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'loop',
    description: 'loops music',

    async execute(message, args, client){

        if(!message.member.voice.channel){
            return message.channel.send('Must be in a vc to use this command')
        }

        const query = args[0];

        if(query == 'single'){
            client.music.setRepeatMode(message, 1);
            const repeatEmbed = new MessageEmbed()
                .setDescription('Song has been looped')
                .setColor('RANDOM')
  
          return message.channel.send(repeatEmbed)
           
        }
        else if(query == 'off'){
            client.music.setRepeatMode(message, 0);
            const repeatEmbed = new MessageEmbed()
                .setDescription('Song has stopped looping')
                .setColor('RANDOM')

            return message.channel.send(repeatEmbed)
        }
        else if(query == 'all'){
            client.music.setRepeatMode(message, 2);
            const repeatEmbed = new MessageEmbed()
                .setDescription('Entire Queue is looped')
                .setColor('RANDOM')

            return message.channel.send(repeatEmbed)

        }
        else{
            return message.channel.send('Not a valid option')
        }
    }
}