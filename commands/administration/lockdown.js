const {Client, Message, MessageEmbed} = require('discord.js')


module.exports = {
  name:"lockdown",
  description:"locks down server(admin only)",


  async execute(message, args,client){

    if(!message.member.permissions.has("ADMINSTRATOR")) return message.channel.send({content:"Only admins can use this"})

  
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }

    const role = message.guild.roles.everyone;

    if(!args.length) return message.channel.send({content:"Please reply to either lockdown or to not"})

    const query = args[0].toLowerCase();


    if(!["true", "false"].includes(query)){
      return message.channel.send({content:"Option is not valid"})
    }

    const perms = role.permissions.toArray();
    if(query == "false"){
      perms.push('SEND_MESSAGES')
      console.log(perms)
      await role.edit({permissions:perms});
      message.channel.send({content:"Server is unlocked"})
    } else {
      const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES')
      console.log(newPerms)

      await role.edit({permissions:newPerms})
      message.channel.send({content:"Server is now locked"})

    }
  }
}
