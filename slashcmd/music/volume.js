const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'volume',
    description:'Changes Volume For Music',
    options: [
        {
            name:'volume',
            description:'Volume to Increase/Decrease By',
            required:true,
            type:'NUMBER',
        }

    ],
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})
 
        const volume = interaction.options.getNumber('NUMBER')

        queue.setVolume(volume)


        interaction.followUp({content:`Volume has been changed to ${volume}`})


    }
}