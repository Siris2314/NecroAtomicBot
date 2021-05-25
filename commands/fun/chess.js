const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name:'chess',
    description:'Invites people to play chess in a voice call',

    async execute(message,args,client){
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        }else{
            return message.channel.send('Must be in VC to use this command')
        }
    }
}