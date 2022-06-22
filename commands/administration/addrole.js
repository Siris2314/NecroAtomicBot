const Discord = require('discord.js')

module.exports = {
  name: 'addrole',
  description: 'adds roles to users',

  async execute(message,args,client){
    if(!message.member.permissions.has("MANAGE_ROLES")){
      return message.channel.send({content:'Perms Denied'})
    }
    if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send({content:'I must have ADMIN command to run this command'})
  }

    const target = message.mentions.members.first()
    if(!target){
      return message.channel.send({content:"Please specify user"})
    }
    const role = message.mentions.roles.first()

    if(!role){
      return message.channel.send({content:"Please specify role to give"})
    }

    await target.roles.add(role)

    message.channel.send({content:`${target.user.username} has been given a new role`})

  }

}
