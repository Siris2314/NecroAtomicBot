const {CommandInteraction, Client} = require('discord.js')
const Schema = require('../../schemas/count')
module.exports = {
    name:'setcount',
    description:'Sets the next Count Number',
    category: "administration",
    permissions: ['ADMINISTRATOR'],
options: [
    {
name: "channel",
description: "Select A Channel for Counting",
type: "CHANNEL",
required: true
    },
    {
        name: "number",
        description: "Set a number for the count",
        type: "INTEGER",
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
    const number = interaction.options.getInteger("number")

if(isNaN(number)) return interaction.reply({content:"Set a positive Number"})
    Schema.findOne({Guild:interaction.guild.id}, async(err, data) => {
        if( channel != data.Channel) {
             interaction.reply({content: `Theres no Counting System Set in  <#${channel.id}>`, ephemeral:true})
        }  
        if(data) {    data.Count = number - 1;
        await data.save();
            interaction.reply({content:`Next Number Set to ${number}`})
        }

    })

   }
}
