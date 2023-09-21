const {CommandInteraction, Client} = require('discord.js')
const Schema = require('../../schemas/count')
module.exports = {
    name:'setupcount',
    description:'Sets a counting game to a channel',
    category: "serversetup",
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
            if(data) data.delete();

            new Schema({
                Guild:interaction.guild.id,
                Channel:channel.id,
                Count:0
            }).save();
        

            interaction.reply({content:`Saved Counting Channel to ${channel}`})
        })


    }
}
