const Schema = require('../schemas/welcomeChannel')
const {Client, Message, MessageEmbed} = require('discord.js')


module.exports = {

    name:'set-channel',
    description:'sets a welcome channel',

    async execute(message,args,client){
        if(!(message.member.hasPermission('ADMINSTRATOR'))) return message.channel.send("Perms Denied")
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send("Please mention a channel")
        Schema.findOne({Guild: message.guild.id}, async(err, data) => {
            if(data){
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }

            message.channel.send(`${channel} has been set as the welcome channel`)
        })


    }
}