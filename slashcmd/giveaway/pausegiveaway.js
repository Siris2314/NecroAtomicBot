const ms = require('ms');

module.exports = {

    name:'pausegiveaway',
    description: 'Pause a giveaway',
    permissions:'MANAGE_MESSAGES',
    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to pause (message ID or giveaway prize)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')){
            return interaction.followUp({
                content: ':x: You need to have the manage messages permissions to pause giveaways.',
            });
        }

        const query = interaction.options.getString('giveaway');

        const giveaway = 
        // Search with giveaway prize
        client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
        // Search with giveaway ID
        client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

    // If no giveaway was found
    if (!giveaway) {
        return interaction.followUp({
            content: 'Unable to find a giveaway for `'+ query + '`.',
            ephemeral: true
        });
    }

    if (giveaway.pauseOptions.isPaused) {
        return interaction.followUp({
            content: 'This giveaway is already paused.',
            ephemeral: true
        });
    }

    // Edit the giveaway
    client.giveawaysManager.pause(giveaway.messageId)
    // Success message
    .then(() => {
        // Success message
        interaction.followUp('Giveaway paused!');
    })
    .catch((e) => {
        interaction.followUp({
            content: e,
        });
    });


    }


}