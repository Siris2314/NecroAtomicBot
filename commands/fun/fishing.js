const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name:'fishing',
    description:'Invites people to play fishing in a voice call',

    async execute(message,args,client){
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                return message.channel.send({content:`${invite.code}`});
            });
        }else{
            return message.channel.send({content:'Must be in VC to use this command'})
        }
    }
}