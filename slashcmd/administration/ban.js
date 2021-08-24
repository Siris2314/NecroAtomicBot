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


        },
        {
            name:'messages',
            description:`Delete banned user's messages`,
            type:'STRING',
            required:true,
            choices: [

                {
                    name:"Delete None",
                    value: "0"
                },
                {
                    name:"Delete past 7 days",
                    value: "7"
                }


            ]
        },   
        {
            name:'reason',
            description:'Provide a reason for ban',
            type:'STRING',
            required:false
        },
    



    ],
   /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */

    run: async (client, interaction) => {
        
        const Target = interaction.options.getMember('target')


        if(Target.id === interaction.user.id) return interaction.followUp({content:'Cannot ban yourself'});

        if(!interaction.user.permissions.has('BAN_MEMBERS')) return interaction.followUp({content:'Invalid Perms'});

        const Reason = interaction.options.getString('reason') || "No Reason"

        if(Reason.length > 512) return interaction.followUp({content:'Reason cannot exceed 512 characters'});

        Target.ban({days:Amount, reason:Reason})

        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Member Banned")
            .setDescription(`✅ **${Target.user.username}** has been banned`)


        interaction.followUp({embeds:[embed]})



    }


}