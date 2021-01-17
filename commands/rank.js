const Discord = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');


module.exports = {
  name: 'rank',
  description: 'returns user rank',

  async execute(message, args, client){
    const target = message.author;
    const user = await Levels.fetch(target.id, message.guild.id)

    const neededXp = Levels.xpFor(parseInt(user.level) + 1);

    if(!user){
      return message.reply('You do not have xp, send some messages to gain some')
    }

    const rank = new canvacord.Rank()
      .setAvatar(mesage.author.displayAvatar.URL({dynamic: false, format:'png'}))
      .setCurrentXP(user.xp)
      .setLevel(user.level)
      .setRequiredXP(neededXp)
      .setStatus(message.author.presence.status)
      .setProgressBar('RANDOM', 'COLOR')
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator)

    rank.build()
      .then(data => {
        const attachment = new Discord.MessageAttachment(data, `user.png`)
        message.channel.send(attachment)
      })
  }
}
