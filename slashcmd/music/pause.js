const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'pause',
    description:'Pauses Music In a Channel',
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        if(queue.setPaused(true)){
            return interaction.followUp({content:`Music in ${vc} is already paused`});
        }

        queue.setPaused(true)

        interaction.followUp({content:`Paused Music in ${vc}`})


    }
}