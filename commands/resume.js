const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'resume',
    description: 'resumes Music',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        let queue = client.music.getQueue(message);
        if(!queue){
            const embed = new MessageEmbed()
              .setTitle(`:x: **Queue Error**`)
              .setDescription('No Queue Currently Exists')
          return message.channel.send(embed)
        }

        await client.music.resume(message);

        const resumeEmbed = new MessageEmbed()
           .setDescription('Music has been resumed')
           .setColor('BLUE')

        return message.channel.send(resumeEmbed);

    }
}