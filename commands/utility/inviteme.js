const Discord = require('discord.js')

module.exports = {

  name:'inviteme',
  description:'creates invites to invite bots to other servers',

  async execute(message,args,client){

    const embed = new Discord.MessageEmbed()
      .setTitle('Invite Me')
      .setDescription(`**[Click this to invite me](https://discord.com/api/oauth2/authorize?client_id=769028291611983882&permissions=0&scope=bot%20applications.commands)**`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
      

    return message.channel.send(embed);
  }
}
