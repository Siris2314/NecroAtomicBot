const axios = require('axios')
const Discord = require('discord.js')

module.exports = {


    name:'spotinfo',
    description:"Returns spotify info on a track and plays in a voice channel",


    async execute(message, args,client) {

        const url = args.join(" ");

        const voiceChannel = message.member.voice.channel;

        
        if(!url) return message.channel.send('Please provide a url to find the preview of')

    try{
        const data = await axios.get(`https://luminabot.xyz/api/json/spotify?link=${url}`)

        const info = data.data;


       
    if(voiceChannel){

        const connection = await voiceChannel.join();
        const dispatcher = connection.play(info.audio);
        dispatcher.once("finish", () => voiceChannel.leave());
        dispatcher.once("error", () => voiceChannel.leave());

        const embed = new Discord.MessageEmbed()
            .setTitle(info.title)
            .setURL(info.link)
            .setColor("RED")
            .addField('Artist', info.artist, true)
            .addField('Release Date', info.release,true)
            .addField('Description', info.description ? info.description : 'No description available', true)
            .setImage(info.image)

        return message.channel.send(embed)

    }
    else{
        
        if(!voiceChannel) message.channel.send('Will Not be playing preview due to not being in VC')
        const embed = new Discord.MessageEmbed()
            .setTitle(info.title)
            .setURL(info.link)
            .setColor("RED")
            .addField('Artist', info.artist, true)
            .addField('Release Date', info.release,true)
            .addField('Description', info.description ? info.description : 'No description available', true)
            .setImage(info.image)

        return message.channel.send(embed)
    }

    } catch(e) {
        message.channel.send('Invalid Spotify Track URL')
    }
    } 
}





