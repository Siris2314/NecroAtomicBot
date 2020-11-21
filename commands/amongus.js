const Discord = require('discord.js');

module.exports = {

  name: "among",
  description: "Send Among Us Code Via a Voice Channel",

  async execute(message, args){

  const channel = message.guild.channels.cache.find(channel => channel.name === ('among-us'));

  const voicechannel = message.member.voice.channel;

  if(!voicechannel){
    return message.reply('Must Be in a Voice Channel')
  }

  const invite = await voicechannel.createInvite({

    maxAge: 0,
    unique: false,
    maxUses: 100,
  })

  const code = args[0];
  if(code.length != 6){
    return message.reply('Code Should only be 6 characters long')
  }
  const codeU = code.toUpperCase()

  const region = args[1];
  let r = '';
  if(region.toLowerCase() === 'eu' || region.toLowerCase() === 'europe') {
    r = 'Europe'
  }

  if(region.toLowerCase() === 'na' || region.toLowerCase() === 'northamerica') {
    r = 'North America'
  }
  if(region.toLowerCase() === 'as' || region.toLowerCase() === 'asia') {
    r = 'Asia'
  }
  if(region === 'undefined' || region === ''){
    return message.reply('Please Specify a valid region')
  }

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username)
    .setTitle('Game Time')
    .addField('**Code**', `${codeU}`, true)
    .addField('**Region**', `${r}`, true)
    .addField('**Voice Channel**', `[Click Here](${invite})`, true)
    .setThumbnail(message.guild.iconURL({dynamic: true}));


  return message.channel.send(embed);



  }
}
