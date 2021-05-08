const Discord = require('discord.js')
module.exports = {
    name:'multipoll',
    description:'Created a multiple choice poll',

    async execute(message, args,client){
        const polls = args.join(" ")
        const regex = polls.match(/"[^"]+"|[\\S] + "[^"]+/g)

        if(regex.length >= 9){
            return message.channel.send('You can only have 9 poll options')
        }

        let str = ''
        let emojis = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣'
        ]

        let i = 0
        for(const poll of regex){
            str = str + `${emojis[i]} ${poll}\n\n`
            i++
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}'s Poll`)
            .setDescription(str.replace(/"/g,''))
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setFooter(message.author.username)
            .setTimestamp()

        const msg = await message.channel.send(embed)

        for(let i = 0; i<regex.length; i++){
            msg.react(emojis[i])
            
        }
    }
}