const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempmute',
    description: 'mutes users for a certain duration',
    async execute(message, args, client){
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send({content:'You do not have permissions to use this command'})
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send({content:'Member is not found.'})
        if(!time) return message.channel.send({content:'Please specify a time'})
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send({content:'Muted role is not found, attempting to create muted role.'})

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send({content:'Muted role has sucessfully been created.'})
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send({content:`${Member.displayName} has already been muted.`})
        await Member.roles.add(role2)
        message.channel.send({content:`${Member.displayName} is now muted for ${(time)}`})

        setTimeout(async () =>{

            await Member.roles.remove(role2)
            message.channel.send({content:`${Member.displayName} is now unmuted`})
        }, ms(time))
    }
}