const axios = require('axios')
const Discord = require('discord.js')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {


    name:'spotinfo',
    description:"Returns spotify info on a track and plays in a voice channel",


    async execute(message, args,client) {

        const url = args.join(" ");

        const voiceChannel = message.member.voice.channel;

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });  

        const player = createAudioPlayer({
            behaviors: {
               noSubscriber: NoSubscriberBehavior.Pause,
           },
        });

        
        if(!url) return message.channel.send('Please provide a url to find the preview of')

    try{
        const data = await axios.get(`https://luminabot.xyz/api/json/spotify?link=${url}`)

        const info = data.data;

       
    if(voiceChannel){


    
        const resource = createAudioResource(info.audio)
        player.play(resource);

        connection.subscribe(player);

     


      

        const embed = new Discord.MessageEmbed()
            .setTitle(info.title)
            .setURL(info.link)
            .setColor("RED")
            .addField('Artist', info.artist, true)
            .addField('Release Date', info.release,true)
            .addField('Description', info.description ? info.description : 'No description available', true)
            .setImage(info.image)


            setTimeout(function() {
                try {
                connection.destroy()
                } catch (err) {
                   message.channel.send("Audio Player Crashed, Rerun command please")
             
                }
               }, 40000) 

        return message.channel.send({embeds:[embed]});

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

        return message.channel.send({embeds:[embed]})
    }

    } catch(e) {
        console.log(e);
        message.channel.send('Invalid Spotify Track URL')
    }
    } 
}





