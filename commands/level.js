const leveling = require('discord-leveling');
const discord = require('discord.js')

module.exports = {

  name:"level",
  description:"returns level of a user",

  execute(message,args){

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

    let output = leveling.Fetch(user.id);

    message.channel.send(`${user.username } is currently at level ${output.level} with ${output.xp} xp`)
    console.log(user);
  }
}
