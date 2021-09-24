const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/warn')
const moment = require('moment')

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
        const member = interaction.options.getMember('user')

     
        const warnings = await Schema.find({
            userId: member.id,
            guildID:interaction.guild.id
        }); 



        console.log(warnings)

        if(!warnings?.length){
            return interaction.followUp({embeds: [new MessageEmbed() .setTitle(':x: Command Error') .setDescription(`User ${member.username} has no warnings in ${interaction.guild.name}`) .setTimestamp()]})
        }

        const desc = warnings
            .map((warn) => {
            const mod = interaction.guild.members.cache.get(warn.moderatorId)
            const d = new Date(warn.timestamp)
            return [
                `warnId: ${warn._id}`,
                `Moderator: ${mod || "Mod Not In Server Anymore"}`,
                `Date: ${d.getHours()}`,
                `Reason: ${warn.reason}`,
            ].join("\n");
        }).join("\n\n")

        console.log(desc)

        const embed = new MessageEmbed()
            .setTitle(`${member.user.username}'s warnings`)
            .setDescription(desc)
            .setColor("RANDOM")
        
        interaction.followUp({embeds:[embed]})

     
    
    

    
    }
}