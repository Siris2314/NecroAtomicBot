const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name:'roast',
    description:'roasts another user',
    async execute(message,args,client){
        if(!args[0]) return message.channel.send('Invalid Format');

        const mentionedUser = message.mentions.users.first()

        if(!mentionedUser) return message.channel.send('No user Mentioned')

        fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
            .then(res => res.json())
            .then(json => {
                const roastEmbed = new Discord.MessageEmbed()
                    .setTitle('Roast Time')
                    .setColor('RANDOM')
                    .setThumbnail(mentionedUser.displayAvatarURL(dynamic = false, {format: 'png'}))
                    .addField(`${message.author.username}'s roast to ${mentionedUser.username}`, [
                        `**${json.insult}**`
                    ]
                    )
                message.channel.send(roastEmbed)

            })
    }
}