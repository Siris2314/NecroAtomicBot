const {Client, Message, MessageEmbed}  = require('discord.js');
const ms = require('ms')
module.exports = {
  name: 'slowmode',
  description: 'enables slowmode in a channel',

  async execute(message, args, client){

    if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send({content:'Perms Denied'})
    if(!args[0]){
      message.channel.setRateLimitPerUser(0);
      return message.channel.send({content:'Slowmode has been removed'})
    }

    const raw = args[0]
    const milliseconds = ms(raw)

    if(isNaN(milliseconds)) return message.channel.send({content:'Not a valid time'}) 

    if(milliseconds < 1000) return message.channel.send({content:'Min slowmode is 1 second'})

    message.channel.setRateLimitPerUser(milliseconds / 1000)

    message.channel.send({content:
      `The slowmode for this channel has been set to ${ms(milliseconds, {
        long: true,
      })}`
    });


    
    
  }
}
