const {Client, Message, MessageEmbed} = require('discord.js')
const {starboardcollection} = require('../index.js')

module.exports = {
    name: 'starboard',
    description: 'Sets a starboard channel',

    async execute(message,args,client){
        const channel = message.mentions.channels.first();

        if(!channel) return message.channel.send("Please mention a channel");

        if(!message.guild.channels.cache.get(channel.id)) return message.channel.send('Channel does not exist')
       
        starboardcollection.set(message.guild.id, channel);

        return message.channel.send(`Starboard Channel has been set to ${channel}`)
    }
}