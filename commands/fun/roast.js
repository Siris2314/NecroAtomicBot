const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name:"roast",
    description:"Roast Another User",
    async execute(message,args,client){
        if(!args[0]) return message.channel.send('Invalid Format');

        const mentionedUser = message.mentions.users.first()

        if(!mentionedUser) return message.channel.send('No user Mentioned')

        fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
            .then(res => res.json())
            .then(json => {
                const roastEmbed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag}'s roast to ` + mentionedUser.tag)
                    .setDescription(json.insult)
                    .setTimestamp()
                    .setFooter('Evil Insult API')

                    return message.channel.send({embeds:[roastEmbed]});

            })
    }
}