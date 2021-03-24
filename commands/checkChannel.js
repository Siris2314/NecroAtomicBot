const Schema = require('../schemas/welcomeChannel')
const {Client, Message, MessageEmbed} = require('discord.js')


module.exports = {
    name:'check-channel',
    description:'checks for welcome channel',

    async execute(message,args,client){
        if(!(message.member.hasPermission('ADMINSTRATOR'))) return message.channel.send("Perms Denied")
      
        Schema.findOne({Guild: message.guild.id}, async(err, data) => {
          try{
          if(!data) return message.channel.send('This guild has no data stored')

          const channel = client.channels.cache.get(data.Channel)

          message.channel.send(`Welcome Channel => ${channel}`)
          } catch(err){
            console.log(err);
          }
        })


    }
}