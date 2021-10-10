const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/music')

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
                    Username:interaction.user.username
    
                }).save()

                let song = await queue.playlist(query).catch(_ => {
                    if(!guildQueue)
                        queue.stop();
                });
    
                
    
            })
            return interaction.followUp({content:'Queueing up your playlist please wait.....'})

        }

        let song = await queue.play(query).catch(_ => {
            if(!queue)
                queue.stop();
        });

        

        
    }
}