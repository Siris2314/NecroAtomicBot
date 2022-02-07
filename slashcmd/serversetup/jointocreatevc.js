const schema = require('../../schemas/jointocreatevc');
const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
module.exports = {

    name: 'jointocreatevc',
    description: 'Join to Create VC feature',
    permission:'ADMINISTRATOR',
    options:[
        {
            name:'voicechannel',
            description:'The voice channel for the Join to Create VC feature',
            type:'CHANNEL',
            required:true
        },
        {
            name:'option',
            description:'Option to Enable/Disable the Join to Create VC feature',
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
              {
                  name:'update',
                  value:'update'
              }
            ],
        }
    ],

    run:async(client, interaction) =>{

        const args = interaction.options.data;
        const voicechannel = interaction.options.getChannel('voicechannel');

        const option = args[1]?.value;

        if(option === 'enable'){

            await schema.findOne({guildId: interaction.guild.id}, async (err, data)=>{
                if(data){
                    interaction.followUp({content:'Join to Create VC feature is already enabled'})
                }
                else{
                    new schema({
                        guildId: interaction.guild.id,
                        channelId: voicechannel.id,
                    }).save()

                    interaction.followUp({content:'Join to Create VC feature has been enabled'})
                }

            })

        }
        else if(option === 'disable'){
            await schema.findOne({guildId: interaction.guild.id}, async (err, data)=>{
                if(!data) interaction.followUp({content:'Join to Create VC feature has been disabled or was never enabled'})

                data.delete()

                interaction.followUp({content:'Join to Create VC feature has been disabled'}); 
            })

        }
        else if(option === 'update'){
            await schema.findOneAndUpdate({guildId: interaction.guild.id}, {channelId:voicechannel.id},{
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,

             })

                
            interaction.followUp({content:`Join to Create VC feature has been updated to ${voicechannel}`})
        
        }

    }

}
