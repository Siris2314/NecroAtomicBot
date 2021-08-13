const {CommandInteraction, Client} = require('discord.js')

module.exports = {
    name:'ping',
    description: 'Returns Websocket Ping',

    run: async (client, interaction) => {
        interaction.followUp({ content: `${client.ws.ping}ms!` });
    }

}