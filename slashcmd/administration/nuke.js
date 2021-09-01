const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {

    name:'nuke',
    description:'Nukes a channel',
    permission: 'ADMINISTRATOR',

/**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */

    run: async (client, interaction) => {

        interaction.channel.clone().then(channel => {
            channel.setPosition(interaction.channel.position)
            channel.send('Channel Has Been Nuked')
        })
        interaction.channel.delete().catch (e => {
                return interaction.followUp({content: 'Something went wrong'})

        })



    }
    

}