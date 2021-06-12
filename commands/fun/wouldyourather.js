const { MessageEmbed } = require('discord.js')
const { WouldYouRather } = require('weky')

module.exports = {
    name: 'wouldyou',
    description: "Send some would-you rather questions",
    async execute(message, args,client){

        await WouldYouRather(message);

        

    }
}