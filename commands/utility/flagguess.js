const { GTF } = require('djs-games')
require('dotenv').config()
const token = process.env.dagapi

module.exports  = {

    name:'flagguess',
    description:'Starts a flag guessing game',

async execute(message,args,client){   
    const game = new GTF({
      message: message,
      token: token, 
      winMessage: 'You Win!',
      loseMessage: 'You Lose!',
      wrongGuess: 'Wrong Guess!',
      stopCommand: 'stop',
      maxAttempts: 10,
    })
    game.start()
}


}

