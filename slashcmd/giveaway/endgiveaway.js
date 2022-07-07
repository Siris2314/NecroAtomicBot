const ms = require('ms');
module.exports = {

    name:'endgiveaway',
    description: 'ends a giveaway',
    permissions:'MANAGE_MESSAGES',
    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to end (message ID)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')){
            return interaction.followUp({
                content: ':x: You need to have the manage messages permissions to end giveaways.',
                ephemeral: true
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
                content: 'Unable to find a giveaway for `'+ query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.followUp({
                content: 'This giveaway is already ended.',
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            interaction.followUp('Giveaway ended!');
        })
        .catch((e) => {
            interaction.followUp({
                content: e,
                ephemeral: true
            });
        });

    }
};