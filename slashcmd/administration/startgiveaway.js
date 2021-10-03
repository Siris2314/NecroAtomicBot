const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const giveawaySchema = require('../../schemas/giveaways')
const ms = require('ms');


module.exports = {
    name:'startgiveaway',
    description:'Starts a Giveaway',
    permission: 'ADMINISTRATOR',
    options:[
        {
            name:'prize',
            description:'Prize being given away',
            type:'STRING',
            required:true,
        },
        {
            name:'duration',
            description:'Duration of the giveaway',
            type:'STRING',
            required:true

        },
        {
            name:'winners',
            description:'Number of Winners for giveaway',
            type:'NUMBER',
            required:true
        }

    ],

    run: async (client, interaction) => {

        const prize = interaction.options.getString('prize');
        const duration = interaction.options.getString('duration');
        const winners = interaction.options.getNumber('winners');

        client.giveawaysManager.start(interaction.channel, {
            duration: ms(duration),
            winners,
            prize,
            hostedBy: interaction.user.username,
            thumbnail: interaction.guild.iconURL({dynamic: true}),

            

        }).then((gData) => {
            console.log(gData);
        })
        


    }
}