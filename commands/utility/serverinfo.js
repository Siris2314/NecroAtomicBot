const Discord = require('discord.js')
const moment = require('moment')

module.exports = {

    name:'serverinfo',
    description:'Info On Server',

    async execute(message,args,client){
        const regions = {
            brazil: '🇧🇷',
            europe: '🇪🇺',
            hongkong: '🇭🇰',
            india: '🇮🇳',
            japan: '🇯🇵',
            russia: '🇷🇺',
            singapore: '🇸🇬',
            southafrica: '🇿🇦',
            sydney: '🇦🇺',
            'us-east': 'US - East 🇺🇸',
            'us-west': 'US - West 🇺🇸',
            'us-south': 'US - South 🇺🇸'
        };

           const status = {
            online: "Online",
            idle: "Idle",
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible"
        };

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Very High'
        };



        console.log(message.guild.region);
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.channels.cache;

        let txt = '<:txtchannel:869281802395738163> '
        let ch = '<:voicechannel:869281232201080933> '
        let mem = '<:members:863637932270551040> '
        let online = "<:online:869190337216774144>"
        let idle = "<:idle:869190610635087873>"
        let dnd = "<:dnd:869190610962247711>"
        let offline = "<:ooffline:869190610710581289>"


        const embed = new Discord.MessageEmbed()
            .setTitle(`Server stats for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true}))
            .addFields(

                {name:'Owner', value:message.guild.owner.user.username, inline: true},
                {name:'Region', value:regions[message.guild.region], inline: true},
                {name: 'Boost Level', value:`Tier: ${message.guild.premiumTier ? message.guild.premiumTier : 'None'}`  , inline: true},
                {name: 'Boosts Count', value:`Tier: ${message.guild.premiumSubscriptionCount ? message.guild.premiumSubscriptionCount : 'None'}`  , inline: true},
                {name:'Verification Level', value: `__${verificationLevels[message.guild.verificationLevel]}__`, inline:true},
                { name: 'Time Created', value: `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]` },




            )
            .addField(`${mem} Member Status`, `${online}  ${members.filter(member => member.presence.status === 'online').size}  ${dnd}: ${members.filter(member => member.presence.status === 'dnd').size}  ${idle}: ${members.filter(member => member.presence.status === 'idle').size}   ${offline}: ${members.filter(member => member.presence.status === 'offline').size}`)
            .addField(
                { name: 'Bots ', value: `${members.filter(member => member.user.bot).size}`, inline: true },
            )
            .addFields(
                { name: 'Roles', value: `${roles.length}`, inline: true },
                { name: 'Emoji Count', value: `${emojis.size}`, inline: true },
            )
            .addField('Channels', `${txt} Channels : ${channels.filter(channel => channel.type === 'text').size} 
             ${ch} Channels : ${channels.filter(channel => channel.type === 'voice').size}`,
            )


            



        message.channel.send(embed);


    }
}
