const { ChaosWords } = require("weky")
var randomWords = require('random-words');
const words  = randomWords(2);

module.exports = {

    name:'chaosgame',
    description:'Runs a chaos words game(try it for yourself and see)',

    async execute(message,args,client){
        await new ChaosWords({
            message: message,
            maxTries: 8, 
            charGenerated: 20, 
            words: words, 
            embedTitle: 'Chaos words!', 
            embedFooter: 'Find the words in the sentence!',
            embedColor: 'RANDOM'
        }).start()
    }
}