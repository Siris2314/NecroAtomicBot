const axios = require('axios')
const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
    name:'spotify',
    description:"Returns spotify info on a track and plays in a voice channel",
    options:[{
        name:'url',
        description:'The url of the track to bring info on',
        type:'STRING',
        required:true
    }
    ],


    run: async(client, interaction) => {

        const url = interaction.options.getString('url');

        const voiceChannel = interaction.member.voice.channel;

    try{
        const data = await axios.get(`https://luminabot.xyz/api/json/spotify?link=${url}`)

        const info = data.data;

       
    if(voiceChannel){




        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });  

        const player = createAudioPlayer({
            behaviors: {
               noSubscriber: NoSubscriberBehavior.Pause,
           },
        });
        

    
        const resource = createAudioResource(info.audio)
        player.play(resource);

        connection.subscribe(player);

     


      

        const embed = new MessageEmbed()
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
                   interaction.channel.send("Audio Player Crashed, Rerun command please")
             
                }
               }, 40000) 

        return interaction.followUp({embeds:[embed]});

    }
    else{
        
        if(!voiceChannel) interaction.channel.send('Will Not be playing preview due to not being in VC')
        const embed = new MessageEmbed()
            .setTitle(info.title)
            .setURL(info.link)
            .setColor("RED")
            .addField('Artist', info.artist, true)
            .addField('Release Date', info.release,true)
            .addField('Description', info.description ? info.description : 'No description available', true)
            .setImage(info.image)

        return interaction.followUp({embeds:[embed]})
    }

    } catch(e) {
        console.log(e);
        interaction.channel.send('Invalid Spotify Track URL')
    }
    } 
}





