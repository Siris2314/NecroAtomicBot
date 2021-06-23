const { Pokemon } = require('djs-games')
require('dotenv').config()
const token = process.env.dagapi

module.exports  = {

    name:'pokemonguess',
    description:'Starts a pokemon guessing game',

async execute(message,args,client){
    const game = new Pokemon({
    message: message,
    token: token, 
    })
    game.start()
}


}

