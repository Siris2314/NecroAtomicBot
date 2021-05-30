var randomWords = require('random-words');
const word = randomWords();
const { ShuffleGuess } = require('weky');
const Discord = require('discord.js')

module.exports = {

    name:'shufflegame',
    description:'Runs a Shuffle Game with buttons',

    async execute(message,args,client){
        const game = new ShuffleGuess({
                      message: message,
                      word: word, 
                      winMessage: "GG you won!", 
                      colorReshuffleButton: 'green', 
                      messageReshuffleButton: 'reshuffle', 
                      colorCancelButton: 'red',
                      messageCancelButton: 'cancel',
                      client: client
        });
        game.start();
    }

}
