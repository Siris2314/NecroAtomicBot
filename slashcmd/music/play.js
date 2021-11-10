const {CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')
const Schema = require('../../schemas/music')
const spotSchema = require('../../schemas/spotify');



module.exports =  {
    name:'play',
    description:'Plays Music In a Channel',
    options:[

        {
        name:'song',
        description:'Song to Play(YouTube or Spotify Link)',
        type:'STRING',
        required:true
        }
    ],

    run: async(client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to play command'})

        const query = interaction.options.getString('song')


        let queue = client.player.createQueue(interaction.guild.id);


        await queue.join(vc)

        if(query.includes("https://open.spotify.com/playlist/") || query.includes("https://www.youtube.com/watch?v=rhTl_OyehF8&list=")){

            await Schema.findOne({Guild: interaction.guild.id}, async(err, data) => {
                if(data) data.delete()
    
    
                new Schema({
                    Guild:interaction.guild.id,
                    Channel:interaction.channel.id,
                    Playlist: query,
                    Username:interaction.user.username,
                    Spotify: false
    
                }).save()

                let song = await queue.playlist(query).catch(_ => {
                    if(!guildQueue)
                        queue.stop();
                });



                
    
            })
            return interaction.followUp({content:'Queueing up your playlist please wait.....'})

        }

        if(query.includes("https://open.spotify.com/track/")){

            await spotSchema.findOne({Guild:interaction.guild.id}, async(err, data) => {
                if(data) data.delete()

                new Schema({
                    Guild:interaction.guild.id,
                    Channel:interaction.channel.id,
                    Song: query,
                    Username:interaction.user.username
                }).save()
            })

            await Schema.findOne({Guild:interaction.guild.id}, async(err, data) => {
                if(data) data.delete();

                new Schema(({
                    Guild:interaction.guild.id,
                    Channel:interaction.channel.id,
                    Playlist:query,
                    Username:interaction.user.username,
                    Spotify:true
                })).save()


            })


            let song = await queue.play(query).catch(_ => {
                if(!guildQueue)
                    queue.stop();




            });

           return interaction.reply({content:'Queueing your songs.....'}).then((message)=>message.delete({timeout:15000}));

        }
        else{


            await Schema.findOne({Guild:interaction.guild.id}, async(err, data) => {
                if(data) data.delete();

                new Schema(({
                    Guild:interaction.guild.id,
                    Channel:interaction.channel.id,
                    Playlist:query,
                    Username:interaction.user.username,
                    Spotify:false
                })).save()


            })



        let song = await queue.play(query).catch(_ => {
            if(!queue)
                queue.stop();
        });
        return interaction.reply({content:'Queueing your songs.....'}).then((message)=>message.delete({timeout:15000}));
        }

    
        

        
    }
}