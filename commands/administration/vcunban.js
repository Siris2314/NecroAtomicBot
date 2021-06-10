const { Client, Message, MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: 'vcunban',
  description:'Unbans members from connecting to VC',
  async execute(message, args,client) {
    if(!message.member.hasPermission('MANAGE_ROLES')) return;
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.reply('Please tell me the member who should not be prevented from joining the vc');

    if(target.id === message.author.id) return message.reply("You cannot unantivc yourself!")

    let role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
    if(!role) return message.reply("Anti-Vc role doesn't exist");

    if(!target.roles.cache.has(role.id)) return message.reply(`${target} was not event prevented from joining the vc in the first place.`);

    target.roles.remove(role.id)
    const embed = new MessageEmbed()
    .setTitle('Member unbanned from VC')
    .setDescription(`${target.displayName} is now able to connect to VC`)
    .setThumbnail(message.mentions.users.first().displayAvatarURL({dynamic:true}))
    .setColor("RANDOM")
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
   return message.channel.send(embed)
  }
}