const {CommandInteraction, Client, MessageEmbed} = require('discord.js');
const request = require("node-superfetch");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
    name:'tts',
    description:'Text-to-Speech Command',
    options:[
        {
            name:'text',
            description:'Text to convert to speech(under 1024 characters)',
            type:'STRING',
            required:true,
        }
    ],


    run: async(client, interaction) => {

      try{
        const text = interaction.options.getString('text');
        const voiceChannel = interaction.member.voice.channel;

        if(!voiceChannel) {
            interaction.followUp({content:'Must be in VC to use tts'})
        }




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

        const { url } = await request
            .get("http://tts.cyzon.us/tts")
            .query({ text });

        const resource = createAudioResource(url);
        player.play(resource);

        connection.subscribe(player);

        interaction.followUp({content:'Playing Audio.........'});


        setTimeout(function() {
            try {
            connection.destroy()
            } catch (err) {
               interaction.channel.send("Audio Player Crashed, Rerun command please")
         
            }
        }, 10000) 

      }catch(err){
        interaction.followUp({content:'Request has failed'});
      }

        
    } 

    }
