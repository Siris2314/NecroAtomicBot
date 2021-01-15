const countGame = new Set();
require('dotenv').config();
const prefix = process.env.prefix;


module.exports = {
  name:"count",
  description: "counting game",

  async execute(message,args,client){

    let num = parseInt(args[0]);

    if(!num){
      return message.channel.send("Please enter a number")
    }

    if(countGame.size === 0){
      if(num !== 1){
        return message.channel.send(`The game must start at **1**!`)
      }

      await countGame.add(message.author.id);
      return message.channel.send(`**${message.member.user.tag}** has started a game! Current count is at **${countGame.size}**`)
    } else if(num !== countGame.size + 1){
      countGame.clear();
      return message.channel.send(`:frowning: **${message.author.user.tag}** has ended the game by entering **${num}**`)
    } else{
      await countGame.add(message.author.id)
      return message.channel.send(`**${message.member.user.tag}** has counted! Game is now at **${countGame.size}**`)
    }



  }
}
