const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name:'whowin',
    description:'Who would win command',

    async execute(message,args,client){

        const user1 = message.mentions.users.array()[0].displayAvatarURL({dynamic:false}) || message.author.displayAvatarURL({dynamic:false});
        const user2 = message.mentions.users.array()[1].displayAvatarURL({dynamic:false}) || message.author.displayAvatarURL({dynamic:false});
        
        
        if(!user1 || !user2) message.channel.send('Please provide two users to put on the poster')


        let res = await fetch(`https://nekobot.xyz/api/imagegen?type=whowouldwin&user1=${user1}&user2=${user2}`)
        
        let result = await res.json()


        const attachment = new Discord.MessageAttachment(result.message, 'whowouldwin.png')

        message.channel.send(attachment)

        


        
    }
}