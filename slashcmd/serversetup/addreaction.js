const Schema = require('../../schemas/reactionRoles');
const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name:'addreaction',
    description:'Add a Custom Role Reaction',
    permissions:'MANAGE_ROLES',
    options:[
        {
        name:'role',
        description:'role to be selected',
        type:'ROLE',
        required: true,

        },
        {
            name:'description',
            description:'Role Description',
            type:'STRING',
            required: true,
        },
        {
            name:'emoji',
            description:'Emoji to be reacted to',
            type:'STRING',
            required: true,
        }
    ],

    run:async(client, interaction) => {
        const role = interaction.options.getRole('role');
        const description = interaction.options.getString('description');
        const emoji = interaction.options.getString('emoji');

        if(role.position >= interaction.guild.me.roles.highest.position){
            return interaction.followUp({content:"Canot Assign a Role that is higher than me"});
        }

        const data = await Schema.findOne({guildId: interaction.guildId});

        const newRole = {
            roleId: role.id,
            description,
            emoji,
        }

        if(data){
            const roleData = data.roles.find((x) => x.roleId === role.id);

            if(roleData){
                roleData = newRole;
            }
            else{
                data.roles = [...data.roles,newRole];

            }

            await data.save();

        }
        else{
            await Schema.create({
                guildId: interaction.guildId,
                roles: newRole
            })
        }


        interaction.followUp({content:`Created a new role reaction for ${role.name}`})


    }
}