const Discord = require('discord.js')


module.exports = {

    name:'spoiltext',
    description:'Returns Spoiler Text',

    async execute(message, args,client){

        message.delete()
        const text = args.join(" ");

        if(!text) return message.channel.send('Please provide text to make into spoiler')

        const spoil = `||${text}||`

        message.channel.send(spoil);

    }

}