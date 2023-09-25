const {Client, CommandInteraction} = require('discord.js')
const Schema = require('../../schemas/count')
module.exports = {
    name:'count',
    description:'Check the next Count',
    permissions: ['SEND_MESSAGES'],

/**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
   run:async  (client, interaction)  =>{

        Schema.findOne({Guild:interaction.guild.id}, async(err, data) => {
            if(data) {
               return interaction.reply({content:`Next Count In <#${data.Channel}> is ${data.Count + 1}`, ephemeral:true})
            }
        })
    }
}
