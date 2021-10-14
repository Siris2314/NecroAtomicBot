const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const moment = require('moment');


module.exports = {
    name:'serverinfo',
    description:'Returns Info About Server',
    

    run: async (client, interaction) => {
        
      const guild = interaction.guild;
        const embed = new MessageEmbed()
        .setTitle(interaction.guild.name)
        .setThumbnail(interaction.guild.iconURL({dynamic : true}))
        .setColor('RANDOM')
        .addField('General Info', [
            `**Server ID :** ${guild.id}`,
            `**Server Name :** ${guild.name}`,
            `**Partnered :** ${interaction.guild.partnered}`,
            `**Verified :** ${interaction.guild.verified}`,
        ].join('\n').toString())
        .addField('Counts', [
            `**Members :** ${interaction.guild.memberCount}`,
            `**Roles :** ${guild.roles.cache.size}`,
            `**Channels :** ${
                guild.channels.cache.size
            } **total** (**Text** : ${guild.channels.cache.filter(
                (ch) => ch.type === "GUILD_TEXT"
            ).size}, **Voice :** ${guild.channels.cache.filter(
                (ch) => ch.type === "GUILD_VOICE"
            ).size})`,
            `**Emojis :** ${guild.emojis.cache.size} (**Regular :** ${
                guild.emojis.cache.filter((e) => !e.animated).size
            }, **Animated :** ${guild.emojis.cache.filter((e) => e.animated).size
            })`
        ].join('\n').toString())
        .addField("Additional Information", [
            `**Created at :** ${moment(guild.createdTimestamp).format(
                "LT"
            )} ${moment(guild.createdTimestamp).format('LL')} ${moment(
                guild.createdTimestamp
            ).fromNow()}`,
            `**Boost Tier :** ${guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"
        }`,
        `**Boost Count :** ${guild.premiumSubscriptionCount || "0"}`
    ].join('\n').toString())
    .addField(`Rules Channel :`, `${interaction.guild.rulesChannel || "None"}`,true)
    .addField(`System Channel :`, `${interaction.guild.systemChannel || "None"}`,true)
    
    interaction.followUp({ embeds: [embed]})
    }
}