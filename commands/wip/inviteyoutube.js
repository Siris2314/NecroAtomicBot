const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name:'watch',
    description:'Invites people to watch youtube in a voice call',

    async execute(message,args,client){
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        }else{
            return message.channel.send('Must be in VC to use this command')
        }
    }
}