const RankSchema = require("../../schemas/ranks")
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'ranks',
    description:'Displays The Rank System',

    async execute(message,args,client){

        RankSchema.find({Guild: message.guild.id}, async(err, data) => {
            if(!data) return message.channel.send('No Data in database')

            const embedDescription = data.map(({Rank, Role}, index) => {
                return `#${index + 1 } | **${Rank}** -> <@&${Role}>`
            }).join('\n')

            message.channel.send(
                new MessageEmbed()
                    .setDescription(embedDescription)
                    .setColor('RANDOM')
            )
        })

    }
}
