const {fight} = require('weky')
const Discord = require('discord.js')


module.exports = {
    name:'fight',
    description:'Fun Fight Command',

    async execute(message,args,client){

 
   try{
    const opponent = message.mentions.users.first();
    if (!opponent) return message.channel.send(`Please mention who you want to fight`);
    
        const x = new fight({
            client: client,
            message: message,
            acceptMessage: 'Click to fight with <@' + message.author + '>',
            challenger: message.author,
            opponent: message.mentions.users.first(),
            hitButtonText: 'HIT',
            hitButtonColor: 'red',
            healButtonText: 'HEAL',
            healButtonColor:  'green',
            cancelButtonText: 'CANCEL',
            cancelButtonColor: 'blurple',
    })
        x.start()
} catch(err){
    return message.channel.send(`User ${opponent} has failed to accept the fight`)
}
     
    }
}