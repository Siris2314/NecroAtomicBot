const Discord = require('discord.js')

module.exports = {
  name: 'removerole',
  description: 'removes roles from users',

  async execute(message,args,client){
    if(!message.member.hasPermission("MANAGE_ROLES")){
      return message.channel.send('Perms Denied')
    }

    const target = message.mentions.members.first()
    if(!target){
      return message.channel.send("Please sepcify user")
    }
    const role = message.mentions.roles.first()

    if(!role){
      return message.channel.send("Please specify role to give")
    }

    await target.roles.remove(role)

    message.channel.send(`${target.user.username} has had a role taken away`)

  }

}
