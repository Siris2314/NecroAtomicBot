const { Client, Message, MessageEmbed, MessageFlags } = require("discord.js");
let random = require("random");
let difficulties = {
  easy: 50,
  normal: 100,
  hard: 250,
  insane: 500,
  ultra: 1000,
  godly: 5000
}
module.exports = {
  name: "numberguess",
  description: "Guess the number game",

  async execute(message, args,client) {

    if(!args[0]) return message.channel.send(`Please provide an actual difficulty? \`easy(50), normal(100), hard(250), insane(500), ultra(1000), godly(5000)\``);
   
    let msg = await message.channel.send(
      `Alright! Send a number between **1** to **${difficulties[args[0].toLowerCase()]}**. I will be checking if your answer is correct. You have 2 minutes to send ANY numbers.`
    );
    let filter = (m) =>
      m.author.id === message.author.id && m.channel.id === message.channel.id;
    let collector = msg.channel.createMessageCollector(filter, { time: 120000 });
    let rand = random.int(1, difficulties[args[0].toLowerCase()]);
    let tries = 0;
    collector.on("collect", async (msg) => {
      if(message.author.bot) return;
      if (!parseInt(msg.content))
        return msg.channel.send("Not a number")
      let embed = new MessageEmbed().setTitle(`Guess the number`);
      if (parseInt(msg.content) === rand) {
        let embed = new MessageEmbed()
          .setTitle(`Guess The Number`)
          .setDescription(
            `Congratulations! The number you choose, **${msg.content}** is correct! You tried ${tries} times!`
          );
          return msg.channel.send({embeds:[embed]}) && collector.stop("correct");
      } else {
        if (parseInt(msg.content) < rand) {
          embed.setDescription(
            `The number you choose(${msg.content}) was **too low**\nTotal tries: ${tries}`
          );
          tries++;
        }
        if (parseInt(msg.content) > rand) {
          embed.setDescription(
            `The number you choose(${msg.content}) was **too high**.\nTotal tries: ${tries}`
          );
          tries++;
        }
      }
      return msg.channel.send({embeds:[embed]});
    });
    collector.on("end", (collected) => { });
  },
};