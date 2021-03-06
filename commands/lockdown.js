const {Client, Message, MessageEmbed} = require('discord.js')


module.exports = {
  name:"lockdown",
  description:"locks down server(admin only)",


  async execute(message, args,client){

    if(!message.member.hasPermission("ADMINSTRATOR")) return message.channel.send("Only admins can use this")


    const role = message.guild.roles.everyone;

    if(!args.length) return message.channel.send("Please reply to either lockdown or to not")

    const query = args[0].toLowerCase();


    if(!["true", "false"].includes(query)){
      return message.channel.send("Option is not valid")
    }

    const perms = role.permissions.toArray();
    if(query == "false"){
      perms.push('SEND_MESSAGES')
      console.log(newPerms)
      await role.edit({permissions:perms});
      message.channel.send("Server is unlocked")
    } else {
      const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES')
      console.log(newPerms)

      await role.edit({permissions:newPerms})
      message.channel.send("Server is now locked")

    }
  }
}
