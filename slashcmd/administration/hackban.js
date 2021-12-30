const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "hackban",
    description: "Bans a user outside the server.",
    permission:'ADMINISTRATOR',
    options:[
        {
            name: "user",
            description: "The ID of the user to ban.",
            type:'STRING',
            required: true
        },
        {
            name: "reason",
            description: "The reason for the ban.",
            type:'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getString('user');
        const reason = interaction.options.getString('reason');

        interaction.guild.members.ban(user, {reason: reason.target < 1 ? "No reason provided." : reason});
        
        const embed = new MessageEmbed()
            .setTitle("Hackban Successful")
            .setDescription(`User ${user} has been banned.`)

        interaction.followUp({embeds:[embed]});

    }
}