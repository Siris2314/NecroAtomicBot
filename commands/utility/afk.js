const {Client, Message, MessageEmbed} = require('discord.js');
const afkSchema = require('../../schemas/afk')
const mongoose = require('mongoose')


module.exports = {

    name:"afk",
    description: 'Sets user to afk',
    async execute(message,args,client){

        const reason = args.join(' ') || 'No Reason'

        let afkProfile = await afkSchema.findOne({user:message.author.id});

        if(!afkProfile){
            afkProfile = await new afkSchema({
                _id:mongoose.Types.ObjectId(),
                Guild:message.guild.id,
                user:message.author.id,
                reason:reason,
                date:message.createdTimestamp
            }).save()

            message.channel.send(`You are now afk \`${reason}\``)
        }
        else{
            message.channel.send("You were already AFK")
        }

        

    }
}