const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name:'serverinfo',
    description:'Returns Info About Server',
    

    run: async (client, interaction) => {
        
        const emojicount = interaction.guild.emojis.cache;
        const roles = interaction.guild.roles.cache
          .filter((r) => r.id !== interaction.guild.id)
          .map((role) => role.toString());
        const members = interaction.guild.members.cache;
        const create = interaction.guild.createdAt.toLocaleDateString();
        const channels = interaction.guild.channels.cache;
 
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setThumbnail(interaction.guild.iconURL())
              .addFields(
                {
                  name: `:white_check_mark: **INFORMATION**`,
                  value: `**Server Name:** \`${
                    interaction.guild.name
                  }\`\n**Server Id:** \`${
                    interaction.guild.id
                  }\`\n**Owner Name:** \`${
                    (await interaction.guild.fetchOwner()).user.username
                  }\`\n**Owner id:** \`${await interaction.guild.ownerId}\`\n`,
                },
                {
                  name: `:white_check_mark: **COUNT**`,
                  value: `**Members:** \`${interaction.guild.memberCount.toString()}\`\n**Roles:**: \`${
                    roles.length
                  }\`\n**Channels:** \`${
                    channels.size
                  }\`\n**Text Channels:** \`${interaction.guild.channels.cache
                    .filter((channel) => channel.type === "GUILD_TEXT")
                    .size.toString()}\`\n**Voice Channels:** \`${interaction.guild.channels.cache
                    .filter((channel) => channel.type === "GUILD_VOICE")
                    .size.toString()}\`\n**Emojis:** \`${emojicount.size}\`\n`,
                },
                {
                  name: `:white_check_mark: **ADDITIONAL INFORMATION**`,
                  value: `**Created At:** \`${create}\`\n**Boost Count** \`${
                    interaction.guild.premiumSubscriptionCount
                  }\`\n**Boost Level** \`${interaction.guild.premiumTier.toString()}\`\n**Verification Level** \`${interaction.guild.verificationLevel.toString()}\`\n`,
                }
              )
 
              .setColor("BLUE")
              .setFooter(
                `Requested by ${interaction.user.tag}`,
                interaction.user.displayAvatarURL({ dynamic: true })
              ),
          ],
        });
    }
}