const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Plays music in a voice channel',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        const query = args.join(" ");
        if(!query) return message.channel.send('Please enter a song name')


        client.music.play(message,query)
        
      

        

       
    }
}