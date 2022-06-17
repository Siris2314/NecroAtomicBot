const {Client, Message, MessageEmbed} = require('discord.js');
const schema = require('../../schemas/anti-invite')


module.exports = {
    name:'anti-invite',
    description: 'Sets Anti Invite System for Server',
    usage:'<prefix> anti-invite',

    async execute(message, args,client){

        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({content:'Perms Denied'})
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }
        const id = args[0] || message.guild.id;


        schema.findOne({Server: id}, async(err, data) =>{
            if(data) return message.channel.send({content:'Server already has anti-invite on'})

            new schema({
                Server: id
            }).save()
            message.channel.send({content:`Anti-Invite has been turned on in ${message.guild.name}`})
        })
        
    }
}
