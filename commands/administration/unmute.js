const {Message} = require('discord.js')
const Schema = require('../../schemas/mute')

module.exports = {

    name: 'unmute',
    description: 'unmutes users',
    async execute(message,args, client){
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');


        Schema.findOne({
            Guild:message.guild.id
        },

        async(err, data) => {
            if(!data) return message.channel.send("Member was not muted")

            const user = data.User.findIndex((prop) => prop === Member.id)

            if(user == -1 ) return message.channel.send("Member is not muted")

            data.Users.splices(user,1);

            data.save()
            await Member.roles.remove(role)

            message.channel.send(`${Member.displayName} has been unmuted`)
        }
        
        
        )


        




        message.channel.send(`${Member.displayName} has been unmuted`)
    }
}
