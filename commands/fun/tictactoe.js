const { TicTacToe } = require('weky')
const Discord = require('discord.js')

module.exports = {
    name:'tictactoe',
    description:'Plays tictactoe with another user',

    async execute(message, args,client){

        const opponent = message.mentions.users.first();
       if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);

       const game = new TicTacToe({
        message: message,
        opponent: opponent, 
        xColor: 'red',
        oColor: 'blurple', 
        xEmoji: '❌',  
        oEmoji: '0️⃣' ,
    })
    game.start()

    }
}