const Discord = require('discord.js')

module.exports = {
  name: 'removerole',
  description: 'removes roles from users',

  async execute(message,args,client){
    if(!message.member.permissions.has("MANAGE_ROLES")){
      return message.channel.send({content:'Perms Denied'})
    }

    const target = message.mentions.members.first()
    if(!target){
      return message.channel.send({content:"Please sepcify user"})
    }
    const role = message.mentions.roles.first()

    if(!role){
      return message.channel.send({content:"Please specify role to give"})
    }

    await target.roles.remove(role)

    message.channel.send({content:`${target.user.username} has had a role taken away`})

  }

}
