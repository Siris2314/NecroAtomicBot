const {Client, Message, MessageEmbed}= require('discord.js')

module.exports = {

  name:"ban",
  description: "Bans members from server",

  async execute(message,args, client){

    if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({content:'Perms Denied'})

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])


    if(!member) return message.channel.send({content:'Please specify a member to ban'})

    if(
      message.member.roles.highest.position <= member.roles.highest.position
    ) return message.channel.send({content:'You cannot ban people who are at the same role level or higher role level than you'})

    const reason = args.slice(1).join(' ') || "No Reason"


   
    const embed = new MessageEmbed()
      .setTitle(`User banned`)
      .addField('Reason', [
        `${reason}`
      ])
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))

    
    member.ban();


    
    return message.channel.send({embeds:[embed]})




  }
}
