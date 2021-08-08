const {image} = require('nekoyasui');
const Discord = require('discord.js')

module.exports = {
    name:'pat',
    description:'Pat another user',

    async execute(message, args,client){

        const member = message.mentions.members.first()  || message.guild.members.cache.get(args[0]) || message.member;

        const petpet = await image.petpet(member.user.displayAvatarURL({ size: 4096, format: "png" }), {
            frames: 40, 
            better: true 
        });
    
        return  message.channel.send({files: [petpet]});

        
    
    }

}