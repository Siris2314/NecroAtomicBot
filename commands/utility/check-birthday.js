const {Client, Message, MessageEmbed}  = require('discord.js')
const Schema = require('../../schemas/birthday')

module.exports = {
    name:'check-birthday',
    description: 'Checks for user birthday',

    async execute(message,args, client){
        const user = message.mentions.users.first() || message.author;
        Schema.findOne({User:user.id}, async(err, data)=>{
            if(!data) return message.channel.send('User has not set a birthday')
            const embed = new MessageEmbed()
                .setTitle(`${message.author.username}'s birthday`)
                .setDescription(`${user} birthday is on ${data.Birthday}`)
            message.channel.send(embed)
        })

    }
}