const ms = require('ms');

module.exports = {

    name:'resumegiveaway',
    description: 'Unpause a giveaway',
    permissions:'MANAGE_MESSAGES',
    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to resume (message ID or giveaway prize)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')){
            return interaction.followUp({
                content: ':x: You need to have the manage messages permissions to unpause giveaways.',
            });
        }

        const query = interaction.options.getString('giveaway');

        // try to found the giveaway with prize then with ID
        const giveaway = 
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return interaction.followUp({
                content: 'Unable to find a giveaway for `'+ query + '`.'
            });
        }

        if (!giveaway.pauseOptions.isPaused) {
            return interaction.followUp({
                content: 'This giveaway is not paused.',
            });
        }

        // Edit the giveaway
        client.giveawaysManager.unpause(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            interaction.followUp('Giveaway unpaused!');
        })
        .catch((e) => {
            interaction.followUp({
                content: e,
            });
        });

    }
};