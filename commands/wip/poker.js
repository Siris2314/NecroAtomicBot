const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name:'poker',
    description:'Invites people to play poker in a voice call',

    async execute(message,args,client){
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                return message.channel.send({content:`${invite.code}`});
            });
        }else{
            return message.channel.send({content: 'Must Be in VC to use this command'});
        }
    }
}