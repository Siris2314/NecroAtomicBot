const Schema = require('../../schemas/starboard')
const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {

    name:'starboard',
    description:'Configure Starboard System',
    options:[
        
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
        let choice = args[0]?.value;

        if(choice == "enable"){

            let starboard = await Schema.findOne({Guild: interaction.guild.id})

            if(!starboard){

                let starboard = new Schema({
                    Guild: interaction.guild.id,
                    Channel: interaction.channel.id
                })

                await starboard.save()

                interaction.followUp({embeds:[new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Starboard System Enabled")
                .setDescription(`Starboard System has been enabled in ${interaction.channel}`)
                .setTimestamp()]})

            }else{

                interaction.followUp({embeds:[(new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Starboard System Already Enabled")
                .setDescription(`Starboard System is already enabled in ${interaction.channel}`)
                .setTimestamp())]})

            }


        }
        else if(choice == "disable"){

            let starboard = await Schema.findOne({Guild: interaction.guild.id})

            if(starboard){
                       
                    await Schema.deleteOne({Guild: interaction.guild.id})
    
                interaction.followUp({embeds:[new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Starboard System Disabled")
                    .setDescription(`Starboard System has been disabled in ${interaction.channel}`)
                    .setTimestamp()]})
                                         

            }
            else{

                interaction.followUp({embeds:[new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Starboard System Not Enabled")
                    .setDescription(`Starboard System is not enabled in ${interaction.channel}`)
                    .setTimestamp()]})



            }
    }
    }
}