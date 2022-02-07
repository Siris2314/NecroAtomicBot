const anime = require('anime-actions');
const Discord = require("discord.js");

module.exports = {
    name: "bonk",
    description: "Bonk another user",
    async execute(message, args, client) {

    try{
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!user){
            return message.channel.send("Who Will U Bonk??????????");
        }

        let data = await anime.bonk();

        let embed = new Discord.MessageEmbed()
        .setImage(data)
        .setColor("#2F3136")
        .setTitle(`${message.author.username} bonks ${user.user.username}`)
        .setTimestamp()


        return message.channel.send({embeds:[embed]});

    } catch(err){
        message.channel.send({content:'API ERROR'})
    }

    }
}