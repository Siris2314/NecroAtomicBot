const Discord = require('discord.js')

module.exports = {

  name:'allemoji',
  description:'Views all emojis in the guild',

  async execute(message, args, client){
    let emojis = "";
    let emojisanimated = "";
    let emojicount = 0;
    let animated = 0;
    let overallemojis = 0;

    function Emoji(id){
      return client.emojis.cache.get(id).toString()
    }
    message.guild.emojis.cache.forEach(emoji => {
      overallemojis++;
      if(emoji.animated){
        animated++;
        emojisanimated+=emoji(emoji.id)
      }
      else{
        emojicount++;
        emojis+=emoji(emoji.id)
      }
    })
    let embed = new Discord.MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(`**Animated [${Animated}]**:\n${emojisanimated}\n\n**Standard**[${emojicount}]**:\n${emojis}\n\n**Overall Emojis [${overallemojis}]**`)
      .setColor('RANDOM')

    message.channel.send(embed)
  }
}
