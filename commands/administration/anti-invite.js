const {Client, Message, MessageEmbed} = require('discord.js');
const schema = require('../../schemas/anti-invite')


module.exports = {
    name:'anti-invite',
    description: 'Sets Anti Invite System for Server',
    usage:'<prefix> anti-invite enable/disable serverid',

    async execute(message, args,client){

        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({content:'Perms Denied'})
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }
        const check = args[0]
        const id = args[1]

        if(check === 'enable') {


        schema.findOne({Server: id}, async(err, data) =>{
            if(data) return message.channel.send({content:'Server already has anti-invite on'})

            new schema({
                Server: id
            }).save()
            message.channel.send({content:`Anti-Invite has been turned on in ${message.guild.name}`})
        })

        }
        else if(check === 'disable') {

        schema.findOne({Server: id}, async(err, data) =>{
            if(!data) return message.channel.send({content:'Server does not have anti-invite on'})

            data.delete()
            message.channel.send({content:`Anti-Invite has been turned off in ${message.guild.name}`})
        })
        }
        else{
            return message.channel.send({content:'Invalid Option, Please use enable or disable'})
        }
        
    }
}
