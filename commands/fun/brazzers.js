const Meme = require("memer-api")
require("dotenv").config();
const key = process.env.memeapi
const memer = new Meme(key)
const Discord = require('discord.js')

module.exports = { 
    name: "brazzers",
    description:"Brazzers Images on user avatars",

    async execute(message,args,client){
        
        let pinged = message.mentions.users.first();

        if(!pinged){
            pinged = message.author
        }

        memer.brazzers(pinged.displayAvatarURL({dynamic:true})).then(image => {
            
            const attachment = new Discord.MessageAttachment(image, "brazzers.png");
             message.channel.send(attachment)
        })
    }
}