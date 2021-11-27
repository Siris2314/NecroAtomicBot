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

        let fullqueue =  arr.map((song,id) =>
        `**${id + 1}**. ${song.name} - \`${song.duration}\``
        ).join("\n");


        const embed = new MessageEmbed() 
            .setTitle(`Queue in **${interaction.guild.name}**`)
            .setDescription(fullqueue)
            .setFooter(queue.nowPlaying.name)
            .setColor("#F0EAD6")

        if (embed.description.length >= 2048){
              const newdescription = `${embed.description.substring(0, 2045)}...`;
        
              const nextpage = new MessageEmbed()
                  .setTitle(`Queue - page 2`)
                  .setDescription(newdescription)
                  .setTimestamp()
                  .setColor("#F0EAD6")
                  
               reactionMenu(interaction, [embed, nextpage]);
                  
        }



        interaction.followUp({embeds:[embed]})
    }
}