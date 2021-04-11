const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'shuffle',
    description: 'Shuffles Queue',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')


        await client.music.shuffle(message);

        const shuffleEmbed = new MessageEmbed()
           .setDescription('Music has been shuffled')
           .setColor('RED')

        return message.channel.send(shuffleEmbed);

    }
}