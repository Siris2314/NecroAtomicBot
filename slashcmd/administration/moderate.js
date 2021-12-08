const {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} = require('discord.js')
const db = require('../../schemas/mute')
module.exports = {

    name: 'moderate',
    description: 'Moderates a user',
    options: [
        {
            name: 'user',
            description: 'The user to moderate',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for moderation',
            type: 'STRING',
            required: false
        }
    ],
    run:async (client, interaction) => {
    const member = interaction.options.getMember('user')
    const reason = interaction.options.getString('reason') || 'No reason specified.'

    if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({content: 'I cannot moderate this user as their highest role is higher than mine or I have the same highest role as them.', ephemeral: true})
    if (member.id === interaction.guild.ownerId) return interaction.reply({content: 'I cannot moderate the owner of the server.', ephemeral: true})
    if (member.id === interaction.user.id) return interaction.reply({content: 'You cannot moderate yourself.', ephemeral: true})
    if (member.id === interaction.guild.me.id) return interaction.reply({content: 'I cannot moderate myself.', ephemeral: true})
    if (client.owners.includes(member.id)) return interaction.reply({content: 'I cannot moderate the owner of the bot.', ephemeral: true})

    let embed = new MessageEmbed().setColor(client.color.invis).setDescription('Please choose an action.')
    const components = (state) => [
        new MessageActionRow().addComponents(
            new MessageButton().setCustomId('kick').setLabel('Kick').setStyle('DANGER').setEmoji('<:greykick:907427405126320198>').setDisabled(state),
            new MessageButton().setCustomId('ban').setLabel('Ban').setStyle('DANGER').setEmoji('<:greyban:907431350620012595>').setDisabled(state),
            new MessageButton().setCustomId('mute').setLabel('Mute').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>'),
            new MessageButton().setCustomId('unmute').setLabel('Unmute').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>')
        )
    ]
    interaction.reply({embeds: [embed], components: components(false)})

    const filter = (i) => i.user.id === interaction.user.id
    const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 30000})

    collector.on('collect', async (i) => {
        if (i.customId === 'kick') {
            if (!interaction.member.permissions.has('KICK_MEMBERS')) return i.reply({embeds: [new MessageEmbed().setDescription(`:x: You need the \`KICK_MEMBERS\` permission to use this command.`).setColor('RED')], ephemeral: true})
            await member.kick(reason)
            const embed1 = new MessageEmbed().setColor(client.color.red).setDescription(`Successfully kicked ${member.toString()} for \`${reason}\``)
            i.update({embeds: [embed1]})
        } else if (i.customId === 'ban') {
            if (!interaction.member.permissions.has('BAN_MEMBERS')) return i.reply({embeds: [new MessageEmbed().setDescription(`:x: You need the \`BAN_MEMBERS\` permission to use this command.`).setColor('RED')], ephemeral: true})
            await member.ban(reason)
            const embed2 = new MessageEmbed().setColor(client.color.red).setDescription(`Successfully banned ${member.toString()} for \`${reason}\``)
            i.update({embeds: [embed2]})
        } else if (i.customId === 'mute') {
            if (!interaction.member.permissions.has('MANAGE_ROLES')) return i.reply({embeds: [new MessageEmbed().setDescription(`:x: You need the \`MANAGE_ROLES\` permission to use this command.`).setColor('RED')], ephemeral: true})
            const data = await db.findOne({Guild: interaction.guild.id})
            if (!data) return i.reply({content: `There is no mute role set for this server. Run \`/set-muterole\`to set a role.`, ephemeral: true})
            const role = interaction.guild.roles.cache.get(data.Role)
            if (!role) return
            const hasRole = member.roles.cache.has(role.id)
            if (hasRole) return i.reply({embeds: [new MessageEmbed().setDescription(`:x: ${member.toString()} already has the mute role.`).setColor('RED')], ephemeral: true})
            await member.roles.add(role)
            const embed3 = new MessageEmbed().setColor(client.color.red).setDescription(`Successfully muted ${member.toString()}.`)
            i.update({embeds: [embed3]})
        } else if (i.customId === 'unmute') {
            if (!interaction.member.permissions.has('MANAGE_ROLES')) return i.reply({embeds: [new MessageEmbed().setDescription(`:x: You need the \`MANAGE_ROLES\` permission to use this command.`).setColor('RED')], ephemeral: true})
            const data = await db.findOne({Guild: interaction.guild.id})
            if (!data) return i.reply({content: `There is no mute role set for this server. Run \`/set-muterole\`to set a role.`, ephemeral: true})
            const role = interaction.guild.roles.cache.get(data.Role)
            if (!role) return
            const hasRole = member.roles.cache.has(role.id)
            if (!hasRole) return i.reply({embeds: [new MessageEmbed().setDescription(`:x: ${member.toString()} does not have the mute role.`).setColor('RED')], ephemeral: true})
            await member.roles.remove(role)
            const embed4 = new MessageEmbed().setColor(client.color.red).setDescription(`Successfully unmuted ${member.toString()}.`)
            i.update({embeds: [embed4]})
        }
    })
    collector.on('end', () => {
        return interaction.editReply({components: components(true)})
    })
    }
}
