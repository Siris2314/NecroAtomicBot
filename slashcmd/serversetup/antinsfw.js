const Schema = require('../../schemas/nsfw')
const {CommandInteraction, Client, MessageEmbed} = require('discord.js');

module.exports = {
    name:'antinsfw',
    description: 'Set the antispam filter to NSFW',
    permission:'ADMINISTRATOR',
    options: [
        {
          name: "choice",
          description: "Enable/Disable Anti-NSFW System",
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

    run:async(client, interaction) => {

        let args = interaction.options.data;
        let choice = args[0]?.value;


        if(choice == "enable"){

           await Schema.findOne({Server:interaction.guild.id}, async (err, data) => {
                if(data){

                    const embed = new MessageEmbed()
                        .setTitle("NSFW Filter System is Already Enabled :x:")
                        .setColor("client.color.invis")
                        .setFooter(interaction.guild.name, interaction.guild.iconURL())
                        .setTimestamp()
                        
                    interaction.followUp({embeds:[embed]});
                }
                
                else{
                    new Schema({
                        Server:interaction.guild.id,
                    }).save()

                    const embed = new MessageEmbed()
                        .setTitle("NSFW Filter System has been Enabled :white_check_mark:")
                        .setDescription(`Enabled by ${interaction.user.username}`)
                        .setColor("client.color.invis")
                        .setFooter(interaction.guild.name, interaction.guild.iconURL())
                        .setTimestamp()
                    
                    interaction.followUp({embeds:[embed]});


                }
                
            })

        }
        else if(choice == "disable"){

            await Schema.findOne({Server:interaction.guild.id}, async (err, data) => {

                    if(!data){
                            
                            const embed = new MessageEmbed()
                            .setTitle("NSFW Filter System is Already Disabled :x:")
                            .setColor("client.color.invis")
                            .setFooter(interaction.guild.name, interaction.guild.iconURL())
                            .setTimestamp()

                            interaction.followUp({embeds:[embed]});
                    }
                    else{
                        data.delete();

                        const embed = new MessageEmbed()
                        .setTitle("NSFW Filter System has been Disabled :white_check_mark:")
                        .setDescription(`Disabled by ${interaction.user.username}`)
                        .setColor("client.color.invis")
                        .setFooter(interaction.guild.name, interaction.guild.iconURL())
                        .setTimestamp()

                        interaction.followUp({embeds:[embed]});
                    }

            })
            

        }
    }
}