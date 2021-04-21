const {fight} = require('weky')
const Discord = require('discord.js')


module.exports = {
    name:'fight',
    description:'Fun Fight Command',

    async execute(message,args,client){

 

        const user = message.mentions.users.first()
        if(!user){
            return message.channel.send('Please mention a user to fight')
        }
        
        const game = new fight({
            client:client,
            message: message,
            acceptMessage: 'Click to fight with ' + message.author.username,
            challenger: message.author,
            opponent: user
        })

       
        game.start();
     
    }
}