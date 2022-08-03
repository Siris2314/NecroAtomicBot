const { CommandInteraction, Client, MessageEmbed} = require('discord.js')


module.exports = {
    name:'transferowner',
    description: 'Transfers ownership of the guild',
    options:[

        {
            name:'user',
            description:'User to transfer ownership to',
            type:'USER',
            required:true
        }

    ],

    run: async(client, interaction) => {

        if(interaction.user.id != interaction.guild.ownerID){
            return interaction.followUp({content:'You must be the owner of the guild to use this command'})
        }

        const user = interaction.options.getMember('user');

        interaction.guild.setOwner(user)
            .then(guild => guild.fetchOwner())
            .then(owner => interaction.followUp({content:`${user} is now the owner of the guild.`}))
            .catch(err => interaction.followUp({content:`Error: ${err}`}))

    }




}