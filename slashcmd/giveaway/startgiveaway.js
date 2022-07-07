const ms = require('ms');
module.exports = {

    name:'startgiveaway',
    description: 'start a giveaway',
    permissions:'MANAGE_MESSAGES',
    options: [
        {
            name: 'duration',
            description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
            type: 'STRING',
            required: true
        },
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
                ephemeral: true
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
        const giveawayDuration = interaction.options.getString('duration');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
        
        if(!giveawayChannel.isText()) {
            return interaction.followUp({
                content: ':x: Selected channel is not text-based.',
                ephemeral: true
            });
        }
    
        // Start the giveaway
        client.giveawaysManager.start(giveawayChannel, {
           
            duration: ms(giveawayDuration),
       
            prize: giveawayPrize,
     
            winnerCount: giveawayWinnerCount,

            hostedBy: interaction.user || null,

            messages
        });
    
        interaction.followUp(`Giveaway started in ${giveawayChannel}, to end giveaway copy the message ID of the Giveaway Embed and use the endgiveaway command!`);
    
    } 

};