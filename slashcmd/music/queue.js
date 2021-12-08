const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const reactionMenu = require("discordv13-pagination")

module.exports = {
    name:'queue',
    description:'Returns Queue of Music In Current Channel',


    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel
        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})
        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

      
        const arr = queue.songs

        const len = queue.songs.length 

        let fullqueue =  arr.map((song,id) =>
        `**${id + 1}**. ${song.name} - \`${song.duration}\``
        ).join("\n");


        const embed = new MessageEmbed() 
            .setTitle(`Queue in **${interaction.guild.name}**`)
            .setDescription(fullqueue)
            .setFooter(queue.nowPlaying.name)
            .setColor("#F0EAD6")

        



        interaction.followUp({embeds:[embed]})
    }
}