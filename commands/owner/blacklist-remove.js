const {Client, Message, MessageEmbed} = require('discord.js');
require("dotenv").config();
const ownerID = process.env.ownerid; 
const schema = require('../../schemas/blacklist-server')

module.exports = {
    name:'blacklist-removes',
    description:'Removes Servers to Blacklist the Bot from(Owner Only)',

    async execute(message,args,client){

        if(message.author.id !== ownerID) return;

        const id = args[0];
        if(!id) return message.channel.send({content:"Please specify a server id to remove the blacklist"}) 
        if(!client.guilds.cache.has(id)) return message.channel.send({content:"I am not in that server"})
        schema.findOne({Server: id}, async(err, data) =>{
            if(!data) return message.channel.send({content:'Server does not exist in database'})

            data.delete()
            message.channel.send({content:`Guild ${id} has been removed from blacklist`})
        })

        
    }
}