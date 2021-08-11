const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {

    name:'vcleaderboard',
    description:'Returns User Voice Duration Spent Leaderboard',

    async execute(message, args,client){

        const embed = await client.vcclient.generateLeaderboard({ 
            message:message, 
            color:'#2F3136',
            thumbnail:message.guild.iconURL({dynamic:true}),
            title:`Leaderboard for ${message.guild.name}`,
            top:8

        })

        
        
        return message.channel.send({embeds:[embed]})
    }


}