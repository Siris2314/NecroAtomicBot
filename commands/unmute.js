const {Message} = require('discord.js')

module.exports = {

    name: 'unmute',
    description: 'unmutes users',
    async execute(message,args, client){
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        client.modlogs({
            Member: Member,
            Action: 'Unmute',
            Color:"RED",
            Reason: reason,
        
        
        
          },
          message
          
        );

        message.channel.send(`${Member.displayName} has been unmuted`)
    }
}
