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

        const vc = interaction.member.voice.channel
        await Schema.findOne({Guild:interaction.guild.id, Name:String(name)}, async (err, data)=> {

            let queue = client.player.createQueue(interaction.guild.id,  {
                data: interaction});
            await queue.join(vc)
            if(!vc) return interaction.followUp({content:'Must be in VC to use command'});
            if(!data) return interaction.followUp({content:`Queue with name ${name} not found`});

    
            const loadqueue = data.Queue;

            interaction.followUp({content:`Loaded queue ${name}`})
            for(let i = 0; i < loadqueue.length; i++){
                await queue.play(loadqueue[i]).catch(_ => {
                    if(!queue)
                        queue.stop();
                });
            }

            


           
        })
    }
}