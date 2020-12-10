var Discord = require('discord.js')
var ms = require('ms')

module.exports = {

  name: 'mute',
  description: 'mute users',


  async execute(message,args,client){

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      return message.reply('Perms Denied')
    }

    var user = message.mentions.users.first();

    if(!user){
      message.reply('Mention Someone to Mute')
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

    var rawTime = args[1];
    var time = ms(rawTime)

    if(!time) {
      return message.reply('Please specify duration to mute')
    }

    // var reason = args.splice(1).join(' ')
    // if(!reason){
    //   return message.reply('Provide a reason to warn')
    // }

    var channel = message.guild.channels.cache.find(c => c.name === 'general')

    var log = new Discord.MessageEmbed()
      .setTitle('User Muted')
      .addField('User: ', user, true)
      .addField('By: ', message.author, true)
      .addField('Expires: ', rawTime, true)
      .addField('Reason: ', reason, true)

      message.channel.send(log)

    var embed = new Discord.MessageEmbed()
      .setTitle(`You were muted!`)
      .addField('Expires: ', rawTime, true)
      .addField('Reason: ', reason, true)


      try {
        user.send(embed)

      } catch(err){
        console.warn(err)
      }

      var role = message.guild.roles.cache.find(r => r.name === 'Muted')
      members.roles.add(role)

      setTimeout(async() => {

        member.roles.remove(role)
      }, time)


      message.channel.send(`**${user}** has been muted by **${message.author}** for **${rawTime}**`)


  }
}
