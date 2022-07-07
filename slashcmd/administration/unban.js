const {Client, CommandInteraction, MessageEmbed} = require('discord.js')

module.exports = {
    name:'unban',
    description: 'unbans members',
    options:[
        {
            name:'user',
            description:'Select user who you want to unban',
            type:'USER',
            required:true,
        }
    ],

    run: async (client, interaction) => {   
        
        if(!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.followUp({content:'Perms Denied'})


        const user = interaction.options.getUser('user')
    

        const bannedMembers = await interaction.guild.bans.fetch()

        if(!bannedMembers.find((user) => user.user.id === user.id)) return interaction.followUp({content:'User is not banned from server'})


        interaction.guild.members.unban(user.id);

        interaction.followUp({content:`Unbanned user ${id}`})

    }
}