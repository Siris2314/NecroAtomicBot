const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'unban',
    description: 'unbans members',

    async execute(message, args,client){
        
        if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({content:'Perms Denied'})

        const id = args[0];

        if(!id) return message.channel.send({content:'Please send an id'})


        const bannedMembers = await message.guild.bans.fetch()

        if(!bannedMembers.find((user) => user.user.id === id)) return message.channel.send({content:'User is not banned from server'})


        message.guild.members.unban(id);

        message.channel.send({content:`Unbanned user ${id}`})

    }
}