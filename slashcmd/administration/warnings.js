const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/warn')

module.exports = {
    name:'warnings',
    description:'Lists warnings of a user',
    permission: 'ADMINSTRATOR',
    options: [
        {
            name:'user',
            description:'User\'s warnings to retrieve',
            type:'USER',
            required:true
        }
    ],


    run: async (client, interaction) => {
        const member = interaction.options.getUser('user')

        const warnings = await Schema.find({
            userId: member.id,
            guildId:interaction.guild.id
        })

        if(!warnings?.length){
            interaction.followUp({embeds: [new MessageEmbed() .setTitle(':x: Command Error') .setDescription(`User ${member.username} has no warnings in ${interaction.guild.name}`) .setTimestamp()]})
        }

        const desc = warnings.map((warn) => {
            
        })
    }
}