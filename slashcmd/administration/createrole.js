const {MessageEmbed, Client, CommandInteraction } = require("discord.js");
const toHex = require('colornames')
module.exports = {
    name:'createrole',
    description:'Create a Role',
    permission:'MANAGE_ROLES',
    options:[
        {
            name:'name',
            description:'The name of the role',
            type:'STRING',
            required:true
        },
        {
            name:'color',
            description:'The color of the role',
            type:'STRING',
            required:true
        },
        

    ],

    run:async(client, interaction) => {


        const name = interaction.options.getString('name')
        const color = interaction.options.getString('color')

        const hex = toHex(color);

        const role = await interaction.guild.roles.create({
            name: name,
            color: hex,

        })


        const embed = new MessageEmbed()
            .setTitle('Role Created')
            .setDescription(`Role ${role.name} created with the color ${role.color}`)
            .setColor(role.color)

        interaction.followUp({embeds: [embed]})
        





    }
}
