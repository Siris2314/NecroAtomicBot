const Schema = require('../../schemas/reactionRoles');
const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name:'removereaction',
    description:'Removes Custom Role Reaction',
    permissions:'MANAGE_ROLES',
    options:[
        {
        name:'role',
        description:'role to be removed',
        type:'ROLE',
        required: true,

        },
    ],

    run:async(client, interaction) => {
        const role = interaction.options.getRole('role');
        
        const data = await Schema.findOne({guildId: interaction.guildId});

        if(!data){
            interaction.followUp({content:'Role Reaction has not been set up in this server'});
        }

        const guildRoles = data.roles;

        const found = guildRoles.find(x => x.roleId === role.id);

        if(!found){
            interaction.followUp({content:'That Role does not have a role reaction in this server'});
        }
        const filter = guildRoles.filter(x => x.roleId !== role.id);
        data.roles = filter;

        await data.save();


        interaction.followUp({content:`Removed: ${role.name} from role reaction system`})


    }
}