const {Client, Message, MessageEmbed} = require('discord.js');
const {createBar} = require('../functions2.js')

module.exports = {
    name:'current',
    description:'Returns Current Track Information',

    async execute(message, args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        let queue = client.music.getQueue(message)

        let track = queue.songs[0];

        const currentEmbed = new MessageEmbed()
          .setTitle(`Now playing :notes: ${track.name}`.substr(0,256))
          .setURL(track.url)
          .setThumbnail(track.thumbnail)
          .addField("Views", `▶ ${track.views}`,true)
          .addField("Dislikes", `:thumbsdown: ${track.dislikes}`,true)
          .addField("Likes", `:thumbsup: ${track.likes}`,true)
          .addField("Duration: ", createBar(queue.currentTime))

        message.channel.send(currentEmbed)
          

    }


}

