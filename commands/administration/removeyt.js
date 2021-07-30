const Discord = require('discord.js')

module.exports = {
    name:'removeyt',
    description:'Remove YT Notifs System',

    async execute(message, args,client){

        let ChannelLink = args[0];

        client.YTP.deleteChannel(message.guild.id, ChannelLink)


        message.channel.send(`Youtube Poster for ${ChannelLink} has been removed from ${message.guild.name}`)



    }

}