const {hangman} = require('reconlx');


module.exports = {

  name: "hangman",
  description: "Hangman game",

  async execute(message, args, client){

    const channel = message.mentions.channels.first() || message.guilds.channels.cache.get(args[0])

    if(!channel){
      return message.channel.send("Please give a channel name")
    }

    const word = args.slice(1).join(" ")
    if(!word){
      return message.channel.send("Please specify a word to guess")
    }

    const hang = new hangman({

      message: message,
      word: word,
      client: client,
      channelID: channel.id
    })

    hang.start();




  }


}
