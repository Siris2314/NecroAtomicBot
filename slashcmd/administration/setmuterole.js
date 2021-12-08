const {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} = require('discord.js')
const db = require('../../schemas/mute')

module.exports = {
    name: 'setmuterole',
    description: 'Set the role that will be given to be users to be Muted',
    permission:'ADMINISTRATOR',
    options: [
        {
            name: 'role',
            description: 'The role to set as the mute role.',
            type: 'ROLE',
            required: true
        }
    ],

    run:async(client, interaction) => {
        const role = interaction.options.getRole('role')
        const data = await db.findOne({Guild: interaction.guild.id})
        if (!data) {
            await db.create({
                Guild: interaction.guild.id,
                Role: role.id
            })
            return interaction.reply({content: `Set the mute role to ${role.toString()}`})
        } else {
            await db.findOneAndUpdate({Guild: interaction.guild.id}, {Role: role.id})
            return interaction.reply({content: `Changed the mute role to ${role.toString()}`})
        }
    }

}