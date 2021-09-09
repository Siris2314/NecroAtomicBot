const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/antiscam')
module.exports = {
    name:'antiscam',
    description: 'Enables Anti-Scam System, Prevents Usage of Scam Links',
    permission: 'ADMINISTRATOR',
    options: [
        
            {
                name:'choice',
                description:'Enable/Disable Scam System',
                type:'STRING',
                required: true,
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
            },
            {
                name:'punishment',
                description:'Punishment for sending Scam links',
                type:'STRING',
                required:false,
                choices:[
                    {
                        name:'warn',
                        value:'warn'
                    },
                    {
                        name:'mute',
                        value:'mute'
                    },
                    {
                        name:'kick',
                        value:'kick'
                    },
                    {
                        name:'ban',
                        value:'ban'
                    }

                ]

            }

        

    ],

     /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

      run: async (client, interaction) => {

        let args = interaction.options.data;
        let choice = args[0]?.value;
        let punishment = args[1]?.value;


        console.log(args)

        if(choice.toLowerCase() === 'enable') {
           Schema.findOne({Guild:interaction.guild.id}, async (err, data) => {
               if(data){
                   data.delete()
             }else{
               new Schema({
                   Guild:interaction.guild.id,
                   Punishment:punishment
               }).save()
               interaction.followUp({content:'✅ Anti-Scam System Enabled'})
            }
           })
           
        }
        else if(choice.toLowerCase() === 'disable') {
            if(!data) return interaction.followUp({content:'Anti-Scam System Was Never Enabled'})
            data.delete()
            interaction.followUp({content:'❌ Anti-Scam System Disabled'})
        }



        

      }

}

