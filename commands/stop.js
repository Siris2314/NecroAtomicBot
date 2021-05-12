const {Client, Message, MessageEmbed} = require('discord.js')


module.exports = {
    name: 'stop',
    description: 'Stops Bot From Playing Music',

    async execute(message,args,client){
        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        message.member.voice.channel.leave();
        

        client.music.stop(message);
    }
}