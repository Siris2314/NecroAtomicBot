const {CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')

module.exports = {
    name:'poll',
    description:'Create a poll',
    options:[
        {
            name:'query',
            description:'The query to poll',
            type:'STRING',
            required:true
        }
    ],

    run:async (client, interaction) => {
        const embed = new MessageEmbed()
        .setColor('#2c93fb')
        .setTimestamp()
        .setTitle(`📢 Poll Request: `)
        .setDescription(`${interaction.options.getString('query')}\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
        .setFooter({ text: `Sent By: ${interaction.user.tag}` })
        .addField('Likes', '0', true)
        .addField('Dislikes', '0', true)

    const upVote = new MessageButton()
        .setStyle('PRIMARY')
        .setEmoji('👍')
        .setCustomId('yes')

    const downVote = new MessageButton()
        .setStyle('PRIMARY')
        .setEmoji('👎')
        .setCustomId('no')

    const row = new MessageActionRow()
        .addComponents([upVote, downVote])

    interaction.followUp({ embeds: [embed], components: [row] })


    }
}