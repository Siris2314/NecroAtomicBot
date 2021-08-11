const Discord = require('discord.js')

module.exports = {

  name:'inviteme',
  description:'Creates an invite to invite NecroAtomicBot to other servers',

  async execute(message,args,client){

    const embed = new Discord.MessageEmbed()
      .setTitle('Invite Me')
      .setDescription(`**[Click this to invite me](https://dsc.gg/necroatomic)**`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
      .setImage(client.user.displayAvatarURL({dynamic:true}))
      .setColor("#2F3136")
      

    return message.channel.send({embeds:[embed]});
  }
}
