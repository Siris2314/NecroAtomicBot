const Meme = require("memer-api");
require("dotenv").config();
const key = process.env.memeapi
const memer = new Meme(key);
const Discord = require('discord.js')

module.exports = {
    name:'delete',
    description:'Delete User Meme',

    async execute(message,args,client){
        const avatar = message.mentions.users.first().displayAvatarURL({dynamic:false}) || message.author.displayAvatarURL({dynamic:false})

        memer.delete(avatar).then(image => {
            const attachment = new Discord.MessageAttachment(image, "delete.png");
            message.channel.send({files: [attachment]});
        })
    }
}