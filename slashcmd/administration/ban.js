const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name:'ban',
    description: 'Bans users',
    options: [

        {

            name:'target',
            description:'Select who you want to ban',
            type:'USER',
            required:true


        }



    ],
   /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */

    run: async (client, interaction) => {
        
        const Target = interaction.options.getUser('target')

        interaction.followUp({content:'Banned User'});

        console.log(Target);
    }


}