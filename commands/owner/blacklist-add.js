const {Client, Message, MessageEmbed} = require('discord.js');
require("dotenv").config();
const ownerID = process.env.ownerid; 
const schema = require('../../schemas/blacklist-server')

module.exports = {
    name:'blacklist-add',
    description:'Adds Servers to Blacklist the Bot, causes commands to stop working in that set server(Owner Only)',

    async execute(message,args,client){

        if(message.author.id !== ownerID) return;
        const id = args[0];
        if(!id) return message.channel.send("Please specify a server id to blacklist") 
        if(!client.guilds.cache.has(id)) return message.channel.send("I am not in that server") 

        schema.findOne({Server: id}, async(err, data) =>{
            if(data) return message.channel.send('Server has already been blacklisted')

            new schema({
                Server: id
            }).save()
            message.channel.send(`Blacklisted server ${id}`)
        })

    }
}