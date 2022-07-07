module.exports = {
    name:'drop',
    description: 'Creates a drop giveaway',
    permissions:'MANAGE_MESSAGES',
    options: [
        {
            name: 'winners',
            description: 'How many winners the giveaway should have',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the giveaway should be',
            type: 'STRING',
            required: true
        },
        {
            name: 'channel',
            description: 'The channel to start the giveaway in',
            type: 'CHANNEL',
            required: true
        }

    ],
    run: async (client, interaction) => {


        if(!interaction.member.permissions.has('MANAGE_MESSAGES')){
            return interaction.followUp({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
            });
        }

        const messages = {
            giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
            giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
            drawing: 'Drawing: {timestamp}',
            dropMessage: 'Be the first to react with 🎉 !',
            inviteToParticipate: 'React with 🎉 to participate!',
            winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
            embedFooter: '{this.winnerCount} winner(s)',
            noWinner: 'Giveaway cancelled, no valid participations.',
            hostedBy: 'Hosted by: {this.hostedBy}',
            winners: 'Winner(s):',
            endedAt: 'Ended at'
        }

        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
    
        if(!giveawayChannel.isText()) {
            return interaction.followUp({
                content: ':x: Selected channel is not text-based.',
            });
        }

        client.giveawaysManager.start(giveawayChannel, {
            // The number of winners for this drop
            winnerCount: giveawayWinnerCount,
            // The prize of the giveaway
            prize: giveawayPrize,
            // Who hosts this giveaway
            hostedBy: interaction.user || null,
            // specify drop
            isDrop: true,
            // Messages
            messages
        });

        interaction.followUp(`Giveaway started in ${giveawayChannel}!`);


    }
}