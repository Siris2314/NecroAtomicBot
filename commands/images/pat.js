const fetch = require('node-fetch')
require('dotenv').config() 
const token = process.env.monkedev
const Discord = require('discord.js')

module.exports = {
    name:'pat',
    description:'Pat another user',

    async execute(message, args,client){

        const member = message.mentions.members.first()  || message.guild.members.cache.get(args[0]) || message.member;

       await fetch(`https://api.monkedev.com/canvas/petpet?imgUrl=${member.user.displayAvatarURL({dynamic: false})}&key=${token}`)
            .then(response => {

                const attachment = new Discord.MessageAttachment(response.body, 'pat.gif');

                message.channel.send(attachment);
            })

    }

}