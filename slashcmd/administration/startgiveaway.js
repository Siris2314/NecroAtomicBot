const Nuggies = require('nuggies');
const {CommandInteraction, Client, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'startgiveaway',
    description: 'Start a giveaway',
    permission:'ADMINISTRATOR',
    options:[
        {
            name:'prize',
            description:'The prize to give away',
            type:'STRING',
            required:true
        },
        {
            name:'winners',
            description:'The number of winners',
            type:'NUMBER',
            required:true
        },
        {
            name:'endafter',
            description:'The time until the giveaway ends(e.g 1h, 1d, 2d)',
            type:'STRING',
            required:true
        },
        {
            name:'channel',
            description:'The channel to start the giveaway in',
            type:'CHANNEL',
            required:true
        },
        {
            name:'role',
            description:'The role required to join a giveaway',
            type:'ROLE',
            required:false

        }
    ],

    run:async(client, interaction)=>{

        const prize = interaction.options.getString('prize');
        const winners = parseInt(interaction.options.getNumber('winners'));
        const endAfter = interaction.options.getString('endafter');
        const role = interaction.options.getRole('role');
        const channel = interaction.options.getChannel('channel');
        const host = interaction.user.id;

        var requirements = [];

        
        if (role) {
            const role = interaction.options.getRole('role');
            requirements = { enabled: true, roles: [role.id] };
        }

        


        Nuggies.giveaways.create(client, {
            prize:prize,
            host:host,
            winners:winners,
            endAfter:(endAfter),
            requirements: requirements ? requirements : [],
            channelID: channel.id
        });

        interaction.followUp({content:`Started Giveaway in ${channel}`})
    }
}
