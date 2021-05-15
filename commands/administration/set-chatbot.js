const {Client, Message, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/chatbot-channel')
module.exports = {
    name:'set-chatbot',
    description:'Sets a chatbot in a channel',


    async execute(message, args,client){
        if(!message.member.hasPermission('ADMINSTRATOR')) return;

        const channel = message.mentions.channels.first() || message.channel

        Schema.findOne({Guild:message.guild.id}, async(err, data) => {
            if(data) data.delete();

            new Schema({
                Guild:message.guild.id,
                Channel: channel.id,
            }).save();
        

            message.channel.send(`Saved chatbot channel to ${channel}`)
        })


    }
}