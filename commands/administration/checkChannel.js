const Schema = require('../../schemas/welcomeChannel')
const {Client, Message, MessageEmbed} = require('discord.js')
const mongoose = require('mongoose')


module.exports = {
    name:'check-channel',
    description:'checks for welcome channel',

    async execute(message,args,client){


        if(!(message.member.permissions.has('ADMINSTRATOR'))) return message.channel.send({content:"Perms Denied"})
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return message.channel.send({content:'I must have ADMIN command to run this command'})
      }

      try{  
      
        Schema.findOne({Guild: message.guild.id}, async(err, data) => {
          try{
          if(!data) return message.channel.send({content:'This guild has no data stored'})

          const channel = client.channels.cache.get(data.Channel)

          message.channel.send({content:`Welcome Channel => ${channel}`})
          } catch(err){
            console.log(err);
          }
        })


    } catch(err){
      console.log(err)
  }
  }

}