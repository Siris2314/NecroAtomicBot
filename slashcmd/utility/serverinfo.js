const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const moment = require('moment');


module.exports = {
    name:'serverinfo',
    description:'Returns Info About Server',
    

    run: async (client, interaction) => {
        const {guild} = interaction;

        const {createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers} = guild;

        const embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})})
            .setThumbnail(guild.iconURL({dynamic: true}))
            .addFields(
                {
                    name:"GENERAL",
                    value:[
                    `Name: ${guild.name}}`,
                    `Created: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                    `Owner:<@${ownerId}>`,
                    `Description: ${description ? description : 'No Description'}`,
                     
                    ].join("\n")
                },

                {
                    name: ":man_standing:  | USERS",
                    value: [
                    `- Members: ${members.cache.filter((m) => !m.user.bot).size}`,
                    `- Bots: ${members.cache.filter((m) => m.user.bot).size}`,
                    `Total: ${memberCount}`
                    ].join("\n")
                    
                },
                {
                    name:":books:  | CHANNELS ",
                    value:[
                    
                     `- Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}`,
                     `- Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`,
                     `- Threads: ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_NEWS_THREAD").size}`,
                     `- Categories: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}`,
                     `- Stages: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}`,
                     `- News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}`,

                      `Total: ${channels.cache.size}`
                    
                    ].join("\n")
                },
                {
                    name: ':smile: | EMOJIS & STICKERS',
                    value:
                    [
                      `- Animated: ${emojis.cache.filter((e) => e.animated).size}`,
                      `- Static: ${emojis.cache.filter((e) => !e.animated).size}`,
                      `- Stickers: ${stickers.cache.size}`,
                      `Total: ${emojis.cache.size + stickers.cache.size}`
                    ].join("\n")
                },
                {
                    name: ':sparkles: | NITRO STATISTICS',
                    value:[
                    
                      `- Roles: ${guild.roles.cache.size}`,
                      `- Tier: ${guild.premiumTier.replace("TIER_", "")}`,
                      `- Nitro Boosts: ${guild.premiumSubscriptionCount}`,
                      `- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`,

                    
                    ].join("\n")
                }
            )
            .setFooter("Last Checked:").setTimestamp();


         interaction.followUp({embeds:[embed]})
        
    }
}