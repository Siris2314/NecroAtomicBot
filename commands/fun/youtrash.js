const Meme = require("memer-api");
const memer = new Meme();
const Discord = require('discord.js')

module.exports = {
    name:'youtrash',
    description: 'Youtube Meme Command',

    async execute(message,args,client){
        const avatar = message.author.displayAvatarURL({format: 'png'})
        const text = args.join(" ")
        const username = message.author.username;

        memer.youtube(avatar, username, text).then(image => {
            const attachment = new Discord.MessageAttachment(image, "youtube.png");
            message.channel.send(attachment)
        })


    }
}