const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'skips music in a queue',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')


        client.music.skip(message);


        const skipEmbed = new MessageEmbed()
          .setDescription('Music has been skipped')
          .setColor('RANDOM')

        return message.channel.send(skipEmbed)
    }
}