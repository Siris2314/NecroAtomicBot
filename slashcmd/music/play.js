const {CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')

const { Utils} = require("discord-music-player");


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


    try{
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to play command'})

        const query = interaction.options.getString('song')



        let queue = client.player.createQueue(interaction.guild.id,  {
            data: interaction});
        await queue.join(vc)



        if(query.includes('https://www.youtube.com/watch' ) || query.includes('https://open.spotify.com/track')){
            let song = await queue.play(query).catch(_ => {
                if(!queue)
                    queue.stop();
            });
        }
        else if(query.includes('https://open.spotify.com/playlist/') || query.includes('https://www.youtube.com/playlist') || query.includes("https://open.spotify.com/album")){
        let song = await queue.playlist(query).catch(_ => {
            if(!queue)
                queue.stop();
        });
        interaction.followUp({content:'Queueing your songs......'})
        }   
        else {


        interaction.followUp({content:'Searching for your song......'})

         
        let arrsongs = [];

        Utils.search(query,null, queue,10)
            .then((songs) => {
                for(let i=0;i<songs.length;i++) {
                   arrsongs.push(songs[i].name);
                }

                let select =  arrsongs.map((song,id) =>
                `**${id + 1}**. ${song} `
                ).join("\n");

                const embed = new MessageEmbed() 
                .setTitle(`Top searches for ${query}, please type in a number for me to play`)
                .setDescription(select)
                .setColor("#F0EAD6")

                interaction.channel.send({embeds:[embed]});


                const filter = (message) => {
                    return message.author.id === interaction.member.id
                }

                const collector = interaction.channel.createMessageCollector({
                    filter:filter,
                    max: 1,
                    time: 60000 * 5
                })

                var text = 0
                collector.on('collect', (message) => {
                    if(isNaN(message.content)){
                        return interaction.channel.send('Invalid Input, please re-run comand')
                    }
                    else{
                        text = Number(message.content);
                    }
                })

                collector.on('end', collected =>{
                    if(collected.size == 0){
                        interaction.channel.send('Timed Out, Failed to Collect Song Input')
                        queue.leave();
                    }
                    else{
                        const song = arrsongs[text-1];
        
                        queue.play(song).catch(_ => {
                            if(!queue)
                                queue.stop();
                        })

                      
                    }
                })

             


                      
            

                
                
            })
        

       

  
    }

    }catch(e){
        return interaction.followUp({content:'Failed To Play Song, Error Code 403'})
  } 

  }
}
