const economy = require('../economy.js')
module.exports = {
  name: "add-balance",
  description:"Adds a set number of coins",
  permissions: 'ADMINISTRATOR',

  async execute(message, args){
    const mention = message.mentions.users.first()

    if(!mention){
      message.reply('Please tag a user to give coins to')
    }

    const coins = args[1];
    if(isNaN(coins)){
      message.reply('Please provide a valid number of coins')
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId,  coins)

    message.reply(`You have given <@${userId}> ${coins}. They now have ${newCoins}`)

  }


}
