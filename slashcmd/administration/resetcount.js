const {CommandInteraction, Client} = require('discord.js')
const Schema = require('../../schemas/count')
module.exports = {
    name:'resetcount',
    description:'Resets the counting.',
    category: "administration",
    permissions: ['ADMINISTRATOR'],
options: [
    {
name: "channel",
description: "Select A Channel for Counting",
type: "CHANNEL",
required: true
    }
],
/**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
   run:async  (client, interaction)  =>{

        const channel = interaction.options.getChannel("channel");
   

        Schema.findOne({Guild:interaction.guild.id}, async(err, data) => {
            if( channel != data.Channel) {
                interaction.reply({content: `Theres no Counting System Set in  <#${channel.id}>`, ephemeral:true})
           }  
        if(!data) return interaction.reply({content: "Set a Counting Channel First", ephemeral:true})
        if(data) {    data.Count = 0; //Reset Game to 0
                     data.UserID = null; //Reset User ID in Database
        await data.save();
            interaction.reply({content:`Counting System Resetted.`})
        }
        });
    

    }
}
