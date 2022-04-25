const TicTacToe = require('discord-tictactoe')
const game = new TicTacToe({language:'en', commandOptionName:'opponent',gameBoardReactions: false})
require('dotenv').config()
const token = process.env.token

module.exports = {
    name: 'tictactoe',
    description: 'Play a game of tic tac toe with another user or AI',
    options: [
        {
            name:'opponent',
            description:'Select whose user you want to play with or leave blank for AI',
            type:'USER',
            require:false
        }
    ],


    run: async(client, interaction) => {

    try{
        game.handleInteraction(interaction)
    }catch(e){
        interaction.channel.send(`An Error Has Occured ${e.message}`)
    }
    }

}