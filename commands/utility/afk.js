const {Client, Message, MessageEmbed} = require('discord.js');
const Schema = require('../../schemas/afk')


module.exports = {

    name:"afk",
    description: 'Sets user to afk',
    async execute(message,args,client){

        const reason = args.join(' ') || 'No Reason'


        await Schema.findOne({Guild:message.guild.id}, async(err,data)=>{
            
            new Schema({
                Guild:message.guild.id,
                User: message.author.id,
                Reason:reason,
                Date: message.createdTimestamp
            }).save()
        })

        message.channel.send(`You are now afk \`${reason}\``)

    }
}