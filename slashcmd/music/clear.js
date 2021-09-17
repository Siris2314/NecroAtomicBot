const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'clear',
    description:'Clears Queue',
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        queue.clearQueue()

        interaction.followUp({content:`Queue Has Been Cleared`})


    }
}