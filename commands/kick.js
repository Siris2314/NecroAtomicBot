const Discord = require('discord.js')

module.exports = {

  name:"kick",
  description: "kicks members from server",

  async execute(message,args, client){

   
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Perms Denied')

    const member = message.mentions.members.first()

    if(!member) return message.channel.send('Please specify a member to ban')

    if(
      message.member.roles.highest.position <= member.roles.highest.position
    ) return message.channel.send('You cannot kick people who are at the same role level or higher role level than you')

    let reason = args.slice(1).join(" ") || "No Reason"

   
    
   const kickembed = new Discord.MessageEmbed()
    .setTitle(`User Kicked`)
    .addField('Reason', [
      `${reason}`
    ])
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))

   member.kick()


   client.modlogs({
    Member: member,
    Action: 'Kick',
    Color:"RED",
    Reason: reason,



  },
  message
  
);


    return message.channel.send(kickembed);

  }
}
