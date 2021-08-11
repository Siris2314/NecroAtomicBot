const {Client, Message, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/starboard')

module.exports = {
    name:'set-starboard',
    description: 'Sets a starboard channel',

    async execute(message,args,client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Perms Denied'})

        const channel = message.mentions.channels.first();

        if(!channel) return message.channel.send({content:"Please mention a channel"});

        Schema.findOne({Guild:message.guild.id}, async(err, data) => {
            if(data) data.delete();

            new Schema({
                Guild:message.guild.id,
                Channel: channel.id,
            }).save();
        

            message.channel.send({content:`Saved starboard channel to ${channel}`})
        })


    }
}