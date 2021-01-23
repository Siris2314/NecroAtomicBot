const economy = require('../economy.js')
const Discord = require('discord.js')
module.exports = {
  name: "pay",
  description: "pays another user",


  async execute(message,args){
    const {guild, member} = message

    const target = message.mentions.users.first()

    if(!target){
      message.reply('Please specify someone to pay')
    }
    const coinsToGive = args[1];

    if(isNaN(coinsToGive)){
      message.reply('Please provide a valid number')
    }

    const coinsOwned = await economy.getCoins(guild.id, member.id)

    if(coinsOwned < coinsToGive){
      message.reply(`You do not have ${coinsToGive}`)
    }

    const remain = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    )
    const nBalance = await economy.addCoins(
      guild.id,
      target.id,
      coinsToGive
    )

    const embed = new Discord.MessageEmbed()
      .setTitle(`**Payment Complete**`)
      .setDescription(`You have given <@${target.id}> ${coinsToGive} coins. They now have ${nBalance}, and you now have ${remain} coins`);
      .setColor('RANDOM')


    message.channel.send(embed);
  }
}
