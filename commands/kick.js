const Discord = require('discord.js')

module.exports = {

  name:"kick",
  description: "kicks members from server",

  async execute(message,args, client){

    if(!message.member.hasPermission("KICK_MEMBERS")){
      return message.channel.send("You can't use that!")
    }
    if(!message.guild.me.hasPermission("KICK_MEMBERS")){
      return message.channel.send("I don't have perms")
    }

    const member = message.mentions.members.first() || message.guild.members.cache.gets(args[0])

    if(!member){
      return message.channel.send("Can't seem to find this user")
    }

    if(!member.kickable){
      return message.channel.send("This can't be kicked")
    }
    if(member.id === message.author.id){
      return message.channel.send("You tryna die or sumthin?")
    }

    let reason = args.slice(1).join(" ")

    if(reason === undefined){
      reason = "Unspecified"
    }
    member.kick(reason)
    .catch(err => {
      if(err){
        return message.channel.send("Something went wrong")
      }
    })

    const kickembed = new Discord.MessageEmbed()
     .setTitle('Member Kicked')
     .setThumbnail(member.user.displayAvatarURL())
     .addField('User Kicked', member)
     .addField('Kicked by', message.author)
     .addField('Reason', reason)
     .setFooter('Time Kicked', client.user.displayAvatarURL())
     .setTimestamp()

     return message.channel.send(kickembed);

  }
}
