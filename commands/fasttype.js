const Commando = require('discord.js-commando');

module.exports = class FastTypeGame extends Commando.Command {

  constructor(client){
    super(client, {
      name: "fasttype",
      description:'Starts a fast type game',
      
    })
  }
}
