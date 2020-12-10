var Discord = require('discord.js')

module.exports = {

  name: 'warn',
  description: 'warns users',


  async execute(message,args,client){

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      return message.reply('Perms Denied')
    }

    var user = message.mentions.users.first();

    if(!user){
      message.reply('Mention Someone to Warn')
    }

    var member;

    try {

      member = await message.guild.members.fetch(user)

    } catch(err){
      member = null;
    }
    if(!member){
      return message.reply('User not in server')
    }

    var reason = args.splice(1).join(' ')
    if(!reason){
      return message.reply('Provide a reason to warn')
    }

    var channel = message.guild.channels.cache.find(c => c.name === 'general')

    var log = new Discord.MessageEmbed()
      .setTitle('User Warned')
      .addField('User: ', user, true)
      .addField('By: ', message.author, true)
      .addField('Reason: ', reason)

      message.channel.send(log)

    var embed = new Discord.MessageEmbed()
      .setTitle(`You were warned!`)
      .setDescription(reason)

      try {
        user.send(embed)

      } catch(err){
        console.warn(err)
      }


      message.channel.send(`**${user}** has been warned by **${message.author}**`)


  }
}
