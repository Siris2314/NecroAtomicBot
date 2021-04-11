const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'pause',
    description: 'Pauses Music',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        await client.music.pause(message);

        const pauseEmbed = new MessageEmbed()
           .setDescription('Music has been paused')
           .setColor('RED')

        return message.channel.send(pauseEmbed);

    }
}