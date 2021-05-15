const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name:'multipoll',
    description:'Created a multiple choice poll',

    async execute(message, args,client){
        const polls = args.join(" ")
        const regex = polls.match(/"[^"]+"|[\\S] + "[^"]+/g)

        const time = args[args.length-1];
        const realtime = ms((time))
        message.channel.send(`Poll set to ${message.channel} for ${ms(realtime, {
            long: true,
          })}`)

        if(regex.length >= 9){
            return message.channel.send('You can only have 9 poll options')
        }

        let str = ''
        const emojis = [
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
        let emojiMap = {
            '1️⃣': {value: -1, correlary: null},
            '2️⃣': {value: -1, correlary: null},
            '3️⃣': {value: -1, correlary: null},
            '4️⃣': {value: -1, correlary: null},
            '5️⃣': {value: -1, correlary: null},
            '6️⃣': {value: -1, correlary: null},
            '7️⃣': {value: -1, correlary: null},
            '8️⃣': {value: -1, correlary: null},
            '9️⃣': {value: -1, correlary: null}
        }
        let i = 0
        for(const poll of regex){
            emojiMap[emojis[i]].correlary = poll;
            str = str + `${emojis[i]}  ${poll}\n\n`

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

        const filter = (reaction, user) => reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == "3️⃣" || reaction.emoji.name == "4️⃣" || reaction.emoji.name == '5️⃣' || reaction.emoji.name == '6️⃣' || reaction.emoji.name == '7️⃣' || reaction.emoji.name == '9️⃣' ||reaction.emoji.name == '8️⃣'

            msg.awaitReactions(filter, { time: realtime}).then(collected => {
            message.channel.send(`${message.author.username}'s poll has ended...fetching results`)

            for(let i = 0; i < emojis.length; i++){
                try{
                    emojiMap[emojis[i]].value = collected.get(emojis[i]).count-1
                }catch{
                    continue;
                }
            }
            var max = 0;
            for(i in emojiMap){
                if(emojiMap[i].value > max){
                    max = emojiMap[i];
                }
            }

            const voteEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}'s Poll Results`)
                .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
                .setColor("RANDOM")
                .setDescription(`The winner was **${max.correlary}** with **${max.value}** votes`)
                .setTimestamp()

            
            

            msg.channel.send(voteEmbed)
        })

    }
}