const { GTL } = require('djs-games')
require('dotenv').config()
const token = process.env.dagapi

module.exports  = {

    name:'logoguess',
    description:'Starts a logo guessing game',

async execute(message,args,client){   
    const game = new GTL({
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

