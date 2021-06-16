const Meme = require("memer-api")
require("dotenv").config();
const key = process.env.memeapi
const memer = new Meme(key)
const Discord = require('discord.js')

module.exports = { 
    name: "brazzers",
    description:"Brazzers Images on user avatars",

    async execute(message,args,client){
        
        const avatar = message.mentions.members.first() || message.author;

        memer.brazzers(avatar).then(image => {
            
            const attachment = new Discord.MessageAttachment(image, "brazzers.png");
             message.channel.send(attachment)
        })
    }
}