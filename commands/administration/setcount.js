const {Client, Message, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/count')
module.exports = {
    name:'setcount',
    description:'Sets a counting game to a channel',


    async execute(message, args,client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Invalid Perms'})

        const channel = message.mentions.channels.first() || message.channel

        Schema.findOne({Guild:message.guild.id}, async(err, data) => {
            if(data) data.delete();

            new Schema({
                Guild:message.guild.id,
                Channel:channel.id,
                Count:0
            }).save();
        

            message.channel.send({content:`Saved counting game channel to ${channel}`})
        })


    }
}