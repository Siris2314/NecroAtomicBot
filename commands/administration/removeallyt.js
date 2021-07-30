const Discord = require('discord.js')

module.exports = {
    name:'removeallyt',
    description:'Removes the entire YouTube Notification System',

    async execute(message, args,client){


        client.YTP.deleteAllChannels(message.guild.id)


        message.channel.send(`Youtube Poster for all YouTube channels has been removed from ${message.guild.name}`)



    }

}