const Schema = require('../../schemas/customvoice')
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'createprivatevoice',
    description:'Sets the channel at which private voice channels can be made',

    async execute(message, args, client){

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Perms Denied')
        const channel = message.mentions.channels.first();
        if(!channel) return message.channel.send('Please mention a channel')

        Schema.findOne({Guild:message.guild.id}, async(err, data) => {
            if(data) data.delete();

            new Schema({
                Guild:message.guild.id,
                Channel: channel.id,
            }).save();
        

            message.channel.send(`Saved private voice channel to ${channel}`)
        })



        
    }
}