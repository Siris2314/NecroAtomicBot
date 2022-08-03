const Discord = require('discord.js')
module.exports = {

    name:'channellock',
    description: 'Locks Down Channels',

    async execute(message,args,client){
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send({content:'Perms Denied'})
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }

        if(!args[0]) return message.channel.send({content:'Please mention a channel'})

        const role = message.guild.roles.everyone;

        let lockChannel = message.mentions.channels.first()
        
        if(!lockChannel) return message.channel.send({content:'Please provide a valid channel'})

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: false
        }).catch(err => console.log(err))

        return message.channel.send({content:'This channel has been locked'})


    }


}