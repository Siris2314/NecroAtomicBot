const {Client, Message, MessageEmbed} = require('discord.js')
const {afk} = require("../index")

module.exports = {
    name:'afk',
    description:'User Afk Command',

    async execute(message, args, client){
        const reason = args.join(" ") || "No Reason!"

        afk.set(message.author.id, [Date.now(), reason])

        message.channel.send(`You are now afk, your given reason was ${reason}`)
    }
}