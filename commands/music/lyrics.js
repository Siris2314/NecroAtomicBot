const Discord = require('discord.js');
const { requestLyricsFor, requestTitleFor } = require("solenolyrics");


module.exports = {
    name : 'lyrics',
    description:'Returns Lyrics of a song',
    async execute(message, args,client){
        let queue = client.music.getQueue(message)
        let cursong = queue.songs[0];


        let lyrics = await requestLyricsFor(cursong.name)
        let title = await requestTitleFor(cursong.name)
        if(!lyrics) return message.channel.send('Could not find lyrics for this song')

        let embed1 = new Discord.MessageEmbed()
            .setTitle(`Lyrics for ${title}`)
            .setDescription(lyrics)
            .setColor("#2F3136");

       let description = " "
       if (embed1.description.length >= 2048){
            description = `${embed1.description.substr(0, 2045)} `;
       }

       let embed2 = new Discord.MessageEmbed()
            .setTitle(`Lyrics for ${title}`)
            .setDescription(description)
            .setColor("#2F3136");

       

       if (embed2.description.length >= 2048){
                description = `${embed2.description.substr(0, 2045)} `;
       }


       
     let embed3 = new Discord.MessageEmbed()
           .setTitle(`Lyrics for ${title}`)
           .setDescription(description)
           .setColor("#2F3136");


     

     if (embed3.description.length >= 2048){
        description = `${embed3.description.substr(0, 2045)} `;

         
    let embed4 = new Discord.MessageEmbed()
        .setTitle(`Lyrics for ${title}`)
        .setDescription(description)
        .setColor("#2F3136");

    message.channel.createSlider(message.author.id, [embed1, embed2, embed3, embed4])
}


    





   
    }

}