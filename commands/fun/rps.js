const { RPS } = require('rayzdev')
module.exports = {
  name: "rps",
  description:
    "Rock Paper Scissors Game. React to one of the emojis to play the game.",
  async execute(message, args,client){

    const opponent = message.mentions.users.first();
   if(!opponent) return message.channel.send(`Please mention who you want to fight`);

   const game = new RPS({
    message: message,
    opponent: opponent, 
    challenger: message.author, 
    acceptMessage: "Click to fight with <@" + message.author + '>', // message sent to see if opponent accepts
})
  game.start()
    
  },
};