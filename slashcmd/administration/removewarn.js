const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/warn')


module.exports = {
    name:"removewarn",
    description:'Removes Single Warning',
    permission:'ADMINISTRATOR',
    options:[
        {
            name:'warnid',
            description:'ID of Warnings, use /warnings, to get the warn ID',
            type:'STRING',
            required:true
        }
    ],
    run: async (client, interaction) => {

        const id = interaction.options.getString('Warn ID')

        const warn = await Schema.findById(id);

        if(!warn){

            return interaction.followUp({content:`${id} is not a valid warning id`})
        }
        warn.delete()



        const user = interaction.guild.cache.users.get(warn.userId)
        interaction.followUp({content:`1 Warning has been removed from ${user}`})


    }
}