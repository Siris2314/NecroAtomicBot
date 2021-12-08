const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/queueSchema');

module.exports = {

    name: 'loadqueue',
    description: 'Loads the queue from the database',
    options:[
        {
            name:'name',
            description:'The name of the queue to load',
            type:'STRING',
            required:true
        }
        
    ],

    run:async(client, interaction) =>{
        const name = interaction.options.getString('name');

        await Schema.findOne({Guild:interaction.guild.id, name:name}, async (data, err)=> {
            if(!data) return interaction.followUp({content:`Queue with name ${name} not found`});

            let queue = client.player.getQueue(interaction.guild.id);
            const loadqueue = data.Queue;

            if(queue){ 
                interaction.followUp({content:`Queue already in VC, cannot override with current one`});
            }
            else {
                let song = await queue.playlist(loadqueue).catch(_ => {
                    if(!queue)
                        queue.stop();
                });

                interaction.followUp({content:`Loaded queue ${name}`});
            }


           
        })
    }
}