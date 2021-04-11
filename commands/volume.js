const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'volume',
    description: 'Changes volume of music playing',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        const volume = parseInt(args[0]);

        if(!args[0]) return message.channel.send(`No Volume set, default volume is 100`)

        await client.music.setVolume(message, volume);

        const volumeEmbed = new MessageEmbed()
           .setDescription(`Volume has been set to ${volume}`)
           .setColor('RED')

        return message.channel.send(volumeEmbed);

    }
}