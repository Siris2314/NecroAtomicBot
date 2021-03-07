const db = require('quick.db')

module.exports = {
  name:"prefix",
  description:'Custom prefix setter',

  async execute(message,args,client){
    if(!message.member.hasPermission("ADMINSTRATOR")) return message.channel.send("Admin only command")


  if(!args[0]) return message.channel.send("Please provide a new prefix")

  if(args[1]) return message.channel.send("Prefix cannot have two spaces")


  db.set(`prefix_${message.guild.id}`, args[0])

  message.channel.send(`Successfully set new prefix to **${args[0]}**`)
}
}
