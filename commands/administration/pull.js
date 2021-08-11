const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'pull',
    description: 'pulls members into VC',

    async execute(message,args, client){
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send({content:'Perms Denied'})

        const member = message.mentions.members.first()

        if(!member) return message.channel.send({content:'Please mention a member to pull'})

        if(!member.voice.channel) return message.channel.send({content:'This member is not in a VC'})

        if(!message.member.voice.channel) return message.channel.send({content:'Must be in a VC to use this command'})

        member.voice.setChannel(message.member.voice.channel)

        message.channel.send({content:`Moved member to ${message.member.voice.channel}`})

    }
}