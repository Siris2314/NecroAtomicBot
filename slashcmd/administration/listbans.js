const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name:'listbans',
    description:'Returns List of Bans in a Server',
    permission: 'BAN_MEMBERS',

    run: async(client, interaction) => {

        const fetchBans = interaction.guild.bans.fetch()
        var amount = 1;
        const bannedMembers = (await fetchBans)
            .map((member) => `${amount++} **${member.user.username}** | (*${member.user.id}*)`)
            .join("\n");

        const list = new MessageEmbed()
            .setTitle(`Bans in ${interaction.guild.name}`)
            .setDescription(`${bannedMembers}`)
            .setFooter(`Amount: ${amount - 1}`)
            .setTimestamp()
            .setColor("RANDOM")
        return interaction.followUp({embeds:[list]})




    }
}