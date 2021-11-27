const {CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')




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



        let queue = client.player.createQueue(interaction.guild.id,  {
            data: interaction});
        await queue.join(vc)



       if(query.includes('https://open.spotify.com/playlist/') || query.includes('https://www.youtube.com/playlist')){
        let song = await queue.playlist(query).catch(_ => {
            if(!queue)
                queue.stop();
        });
        interaction.followUp({content:'Queueing your songs......'})
        }   else {
        let song = await queue.play(query).catch(_ => {
            data: { custom: 'fields' }
            if(!queue)
                queue.stop();
        });
        interaction.followUp({content:'Queueing your songs......'})
    }


    
    
        
    }
}