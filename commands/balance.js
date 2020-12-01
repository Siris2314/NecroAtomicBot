
const economy = require('../economy.js')
module.exports = {
  name: "balance",
  description: "returns money balance",

  async execute(message,args){
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId);

    if(message.mentions.users.first() == message.author){
      message.reply(`You have ${coins}`)
    } else {

    message.reply(`That user has ${coins} coins`)
  }



  }
}
