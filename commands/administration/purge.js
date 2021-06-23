const discord = require('discord.js');

module.exports = {
  name:"purge",
  description: "clears user messages in a channel",
  usage:'<prefix> (amount) or (user) amount(limit = 100)',

  async execute(message,args, client) {

    const member = message.mentions.members.first()
    const messages = message.channel.messages.fetch()


    if(member){
      const userMessages = (await messages).filter(
        (m) => m.author.id === member.id
      )
      await message.channel.bulkDelete(userMessages)
      message.channel.send(`${member}'s messages has been deleted`)
    } else{
      if(!args[0]){
        return message.channel.send("Please specify number of messages to delete")
      }

      if(isNaN(args[0])){
        return message.channel.send("Only numbers are allowed")
      }
      if(parseInt(args[0]) > 99){
        return message.channel.send("Max deletion amount is 99")
      }

      await message.channel
          .bulkDelete(parseInt(args[0]) + 1)
          .catch((err) => console.log(err))
    }


  }
};