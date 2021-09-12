const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name:'kick',
    description: 'kicks a member from server',
    permission: 'ADMINISTRATOR',
    options: [
        {

            name:'target',
            description:'User to be kicked',
            type:'USER',
            required: true,


        },

        {

            name:'reason',
            description:'Reason for kick',
            type:'STRING',
            required: false,

        }

    ],

    run: async (client, interaction) => {
        const user = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || 'No Reason'

        if(
            interaction.member.roles.highest.position <= user.roles.highest.position
          ) return interaction.followUp({content:'You cannot kick people who are at the same role level or higher role level than you'})
      
        user.kick({reason:reason});

        const embed = new MessageEmbed()
            .setTitle('Member Kicked')
            .setDescription(`✅ Member ${user.user.username} kicked from ${interaction.guild.name} for ${reason}`)
            .setTimestamp()

        interaction.followUp({embeds:[embed]})

    }


}