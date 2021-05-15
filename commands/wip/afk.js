const {Client, Message, MessageEmbed} = require('discord.js');
const {afk} = require('../../index.js');


module.exports = {

    name:"afk",
    description: 'Sets user to afk',
    async execute(message,args,client){

        const reason = args.join(' ') || 'No Reason'

        afk.set(message.author.id, [Date.now(), reason])

        message.channel.send(`You are now afk \`${reason}\``)

    }
}