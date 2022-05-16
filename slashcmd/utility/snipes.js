const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {

    name:'snipes',
    description:'Snipe Messages in a Channel',  

    run: async(client, interaction) => {

        const msg = client.snipes.get(interaction.channel.id)

       
      if(!msg) return interaction.followUp({ content: 'There Are No Deleted Messages' })

      const snipeEmbed = new MessageEmbed()
      .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL())
      .setColor(`#000488`)
      .setDescription(msg.content)
      .setTimestamp()


      if(msg.image)snipeEmbed.setImage(msg.image)
      interaction.followUp({ embeds: [snipeEmbed]})
    },

    
}