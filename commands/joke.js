const randomPuppy = require('random-puppy');
const Discord = require('discord.js');


module.exports = {
  name: "Joke/Meme",
  description: "Gives a joke or meme",
  async execute(message,args){
    const subReddits = ["dankmeme", "meme", "memes"]
    const random = subReddits[Math.floor(Math.random()) * subReddits.length]

    const img = await randomPuppy(random);

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage(img)
      .setTitle(`Your meme....idk how funny it is. Source: r/${random}`)
      .setURL(`https://reddit.com/r/${random}`)

    message.channel.send(embed);
  }
}
