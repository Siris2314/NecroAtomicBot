const Discord = require('discord.js');
const { requestLyricsFor, requestTitleFor, requestAuthorFor } = require("solenolyrics");


module.exports = {
    name : 'lyrics',
    description:'Returns Lyrics of a song',
    async execute(message, args,client){
        let queue = client.music.getQueue(message)
        let cursong = queue.songs[0];


        let lyrics = await requestLyricsFor(cursong.name)
        let title = await requestTitleFor(cursong.name)
        let author = await requestAuthorFor(cursong.name)
        if(!lyrics) return message.channel.send('Could not find lyrics for this song')

        let embed = new Discord.MessageEmbed()
            .setTitle(`Lyrics for ${title} - ${author}`)
            .setDescription(lyrics)
            .setColor("#2F3136");

        
        if (embed.description.length >= 2048)
            embed.description = `${embed.description.substr(0, 2045)}`;

       return message.channel.send(embed)


     
}
}


    

