const Discord = require('discord.js')
const moment = require('moment')

module.exports = {

    name:'serverinfo',
    description:'Info On Server',

    async execute(message,args,client){
     
        const { guild } = message

        const { createdTimestamp, ownerId, memberCount, emojis, roles, stickers, channels } = guild
        const icon = guild.iconURL() // Icon Of Server
        const totEmoji = emojis.cache.map(e => e.toString()) // All Emojis Of Server
        const totRoles = roles.cache.map(e => e.toString()) // All Roles Of Server

        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor({
            name: `${guild.name} Info`,
            iconURL: icon
        })
        .setThumbnail(icon)
        // Info About Server
        .addFields(
            { name: `**Server Name**:`, value: guild.name, inline: true },
            { name: `**Server ID:**`, value: guild.id, inline: true },
            { name: `**Server Owner:**`, value: `<@${ownerId}>`, inline: true },
            { name: `**Server Created:**`, value: `<t:${parseInt(createdTimestamp / 1000)}:R>`, inline: true },
            { name: `**Members In Server:**`, value: `${memberCount}`, inline: true },
            { name: `\u200B`, value: `\u200B`, inline: true },
            { name: `**Boost Count:**`, value: `${guild.premiumSubscriptionCount}`, inline: true },
            { name: `**Boost Tier:**`, value: `${guild.premiumTier}`, inline: true },
            { name: `\u200B`, value: `\u200B`, inline: true },
            { name: `**Emojis In Server:**`, value: `${emojis.cache.size}\nAnimated: ${emojis.cache.filter(emoji => emoji.animated).size}\nNormal: ${emojis.cache.filter(emoji => !emoji.animated).size}`, inline: true },            
            { name: `**Emojis:**`, value: `${totEmoji}`, inline: true },
            { name: `Stickers In Server:`, value: `${stickers.cache.size}`, inline: true }, // We Will This As Empty So It Won't Look Messed Up In Embed
            { name: `**Roles In Server:**`, value: `${roles.cache.size - 1}`, inline: true }, // -1 To Remove @everyone
            { name: `**Roles:**`, value: `${totRoles}`, inline: true },
            { name: `**Highest Role:**`, value: `${roles.highest}`, inline: true },
            { name: `**Server Stats:**`, value: `Total: ${channels.cache.size}\n${channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size} ⌨️\n${channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size} 🔈\n${channels.cache.filter(channel => channel.type === 'GUILD_NEWS').size} 📢\n${channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size} 📁`}, // You Can Add More Options
            // You Can Add More Options
        )
        .setFooter({
            text: guild.name,
            iconURL: icon
        })






     return message.channel.send({embeds:[embed]});


    }
}
