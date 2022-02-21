const {CommandInteraction, Client, MessageEmbed} = require('discord.js');


module.exports = {

    name:'firstmessage',
    description:'Fetches First Message in a Channel',

    run:async (client, interaction) => {

    const fetchmessages = await interaction.channel.messages.fetch({ limit: 1, after: 1 })
    const msg = fetchmessages.first()

    const embed = new MessageEmbed()
      .setDescription(`
      **Message Content:** ${msg.content}
      **Sent By:** ${msg.author}
      **Date sent:** <t:${parseInt(msg.createdTimestamp / 1000)}:R>
      **URL:** [Click Me](${msg.url})
      `)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setColor(client.color.turquoise)
      .setTimestamp()
    interaction.followUp({ embeds: [embed] })
    }

}