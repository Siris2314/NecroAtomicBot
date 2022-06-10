const { CommandInteraction, Client, MessageEmbed} = require("discord.js")
const Schema = require('../../schemas/boostsystem')
module.exports = {
    name:'boostdetector',
    description:'Boost Detection System',
    options:[
        {
            name:'channel',
            description:'Channel to send the boost detection message to',
            type:'CHANNEL',
            required:true
        },
        
        {
            name: "choice",
            description: "Enable/Disable Starboard System",
            type: "STRING",
            required: true,
            choices: [
              {
                name: "enable",
                value: "enable",
              },
              {
                name: "disable",
                value: "disable",
              },
            ],
          },
    ],

    run: async (client, interaction) => {

        let args = interaction.options.data;
        let choice = args[1]?.value;
        const channel = interaction.options.getChannel('channel')

        if(choice == "enable"){
            await Schema.findOne({Server: interaction.guild.id}, async (err, data) => {
                if(data){
                    interaction.followUp(`Boost Detection System is already enabled in ${data.Channel}`)
                }
                else{
                    new Schema({
                        Server: interaction.guild.id,
                        Channel:channel.id
                    }).save()

                    interaction.followUp(`Boost Detection System has been enabled in ${channel}`)
                }


            })

        }
        else if(choice == "disable"){
            await Schema.findOne({Server:interaction.guild.id}, async (err, data)=>{
                if(data){
                    data.delete()
                    interaction.followUp(`Boost Detection System has been disabled in ${data.Channel}`)
                }
                else{
                    interaction.followUp(`Boost Detection System is already disabled`)
                }
            })
        }

    }
}