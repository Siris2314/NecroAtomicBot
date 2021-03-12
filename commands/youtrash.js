const canva = require('canvacord')
const Discord = require('discord.js')

module.exports = {
    name:'youtrash',
    description:'returns a custom youtube comment',

    async execute(message,args,client){
        try{
        const input = args[0]
        const input2 = args.join(" ")

        let username = (message.author.username)
        let avatar = message.author.displayAvatarURL({ dynamic: true, format: "png" });
        let darkmode = true
        let image = canva.Canvas.youtube(username,input2 ,avatar, darkmode)

        let sender = new Discord.MessageAttachment(image, "youtrash.png")

        message.channel.send(sender)
        } catch(err){
            message.channel.send(err)
        }

        
        
    }
}



