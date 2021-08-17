const { MessageEmbed } = require('discord.js');
const db = require('../../schemas/afk');

module.exports = {
  name: 'afk',
  descriptoon:'AFK System',
 async execute(message, args,client){
    const afkreason = args.slice(0).join(' ') || 'No reason';
    db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
      if(data) {
        return;
      } else {
        data = new db({
          Guild: message.guild.id,
          Member: message.author.id,
          Content: afkreason,
          TimeAgo: Date.now()
        })
        data.save()
        const afksave = new MessageEmbed()
            .setTitle(`${message.author.tag} is now afk`)
            .setDescription( `\`\`\`${afkreason}\`\`\``)
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        
        message.channel.send({ embeds: [afksave]})
      }
    })
  }
}