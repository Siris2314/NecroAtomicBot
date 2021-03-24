const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'pull',
    description: 'pulls members into VC',

    async execute(message,args, client){
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Perms Denied')

        const member = message.mentions.members.first()

        if(!member) return message.channel.send('Please mention a member to pull')

        if(!member.voice.channel) return message.channel.send('This member is not in a VC')

        if(!message.member.voice.channel) return message.channel.send('Must be in a VC to use this command')

        member.voice.setChannel(message.member.voice.channel)

        message.channel.send(`Moved member to ${message.member.voice.channel}`)

    }
}