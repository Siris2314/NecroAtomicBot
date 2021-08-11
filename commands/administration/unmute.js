const {Message} = require('discord.js')
const Schema = require('../../schemas/mute')

module.exports = {

    name: 'unmute',
    description: 'unmutes users',
    async execute(message,args, client){

        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send({content:'You do not have permissions to use this command'})
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send({content:'Member is not found.'})

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');


        Schema.findOne({
            Guild:message.guild.id
        },

        async(err, data) => {
            if(!data) return message.channel.send({content:"Member was not muted"})

            const user = data.Users.findIndex((prop) => prop === Member.id)

            if(user == -1 ) return message.channel.send({content:"Member is not muted"})

            data.Users.splice(user,1);

            data.save()
            await Member.roles.remove(role)

            message.channel.send({content:`${Member.displayName} has been unmuted`})
        }
        
        
        )


        




        message.channel.send(`${Member.displayName} has been unmuted`)
    }
}
