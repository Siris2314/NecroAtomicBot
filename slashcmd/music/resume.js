const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'resume',
    description:'Resumes Music In a Channel',
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        queue.setPaused(false)

        interaction.followUp({content:`Resumed Music in ${vc}`})
    }
}