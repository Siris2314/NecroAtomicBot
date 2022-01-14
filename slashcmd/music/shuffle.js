const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'shuffle',
    description:'Shuffles songs in the queue',
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        if(queue.songs.length == 1) {
            return interaction.followUp({content:`Cannot Shuffle with only one song in queue`});
        }
        else{

        queue.shuffle()

        interaction.followUp({content:`Shuffled to ${queue.songs[1].name}`})
        }


    }
}