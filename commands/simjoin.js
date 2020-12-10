const Discord = require('discord.js')


module.exports = {

  name:'simjoin',
  description:'Simulates join',

  async execute(message,args,client){

    message.client.emit('guildMemberAdd', message.member)
  }
}
