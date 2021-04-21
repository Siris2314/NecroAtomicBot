const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'queue',
    description: 'Displays Current Queue',

    async execute(message,args,client){



        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')
        let queue = client.music.getQueue(message);

        let fullqueue =  queue.songs.map((song, id) =>
        `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).join("\n");


        const queueEmbed = new MessageEmbed()
         .setColor("RANDOM")
         .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
         .setTitle('Current Queue')
         .setDescription(fullqueue)

         if(queueEmbed.description.length > 2048){
            queueEmbed.description.slice(2048)
            queueEmbed.setDescription(fullqueue)
         }

        return message.channel.send(queueEmbed);






    }
}