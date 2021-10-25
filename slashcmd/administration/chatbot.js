const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require("../../schemas/chatbot-channel");

module.exports = {
    name:'chatbot',
    description:'Enable/Disable Chatbot',
    permission:'ADMINISTRATOR',
    options:[
        {
            name:'choice',
            description:'Enable/Disable Chatbot System',
            type:'STRING',
            required:true,
            choices:[
                {
                    name:'enable',
                    value:'enable'
                },
                {
                    name:'disable',
                    value:'disable'

                }

            ]
        }
    ],

     /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    run: async(client, interaction) => {


        let args = interaction.options.data;
        let choice = args[0]?.value;

        if(choice.toLowerCase() === 'enable') {
            Schema.findOne({Guild:interaction.guild.id}, async (err, data) => {
                if(data){
                    data.delete()
              }else{
                new Schema({
                    Guild:interaction.guild.id,
                    Channel:interaction.channel.id
                }).save()
                interaction.followUp({content:'✅ ChatBot System Enabled'})
             }
            })
            
         }
         else if(choice.toLowerCase() === 'disable') {
            if(!data) return interaction.followUp({content:'Anti-Scam System Was Never Enabled'})

            Schema.findOne({Guild:interaction.guild.id}, async (err, data) => {

                if(!data) interaction.followUp({content:'ChatBot System was never enabled'})
                data.delete()
            })
            interaction.followUp({content:'❌ ChatBot System Disabled '})
        }



    }
}