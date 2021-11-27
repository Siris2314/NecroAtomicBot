const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'nowplaying',
    description: 'Shows the current song playing',

    run:async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})
        
        const song = queue.songs[0]
        const progressbar = queue.createProgressBar()

        if(song.name.includes("Official Video") || song.name.includes("Official Music Video") || song.name.includes("Official Audio")){
            const newname = song.name.replace("(Official Video)", "") ||song.name.replace("(Official Music Video)", "") || song.name.replace("(Official Audio)", "")
            const embed = new MessageEmbed()
                .setTitle(`**Currently Playing**`)
                .setColor(client.color.invis)
                .addField('Song Name', newname)
                .setDescription(progressbar.prettier.toString())
                .setThumbnail(song.thumbnail)
                .setTimestamp()

            return interaction.followUp({embeds:[embed]})

        }
        else{
            const embed = new MessageEmbed()
                .setTitle(`**Currently Playing**`)
                .setColor(client.color.invis)
                .addField('Song Name', song.name)
                .setDescription(progressbar.prettier.toString())
                .setThumbnail(song.thumbnail)
                .setTimestamp()

            return interaction.followUp({embeds:[embed]})

        }

       

    }
}