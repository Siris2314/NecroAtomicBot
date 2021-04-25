const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'unban',
    description: 'unbans members',

    async execute(message, args,client){
        
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Perms Denied')

        const id = args[0];

        if(!id) return message.channel.send('Please send an id')


        const bannedMembers = await message.guild.fetchBans();

        if(!bannedMembers.find((user) => user.user.id === id)) return message.channel.send('User is not banned from server')


        message.guild.members.unban(id);
        client.modlogs({
            Member: id,
            Action: 'Unban',
            Color:"RED",
            Reason: reason,
        
        
        
          },
          message
          
        );

        message.channel.send(`Unbanned user ${id}`)

    }
}