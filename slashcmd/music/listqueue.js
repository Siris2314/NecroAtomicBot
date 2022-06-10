const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/queueSchema');


module.exports = {
    name:'listqueue',
    description:'Lists all saved queues',

    run:async(client, interaction) =>{


        await Schema.find({Guild: interaction.guild.id}, async (err, data)=>{

            let name = []
            let queuelen = []

            let desc = ""
            let counter = 0;

            const len = Object.keys(data).length / 7;
            for(let i = 0; i < len; i++) {
                name.push(data[i].Name)
               for(let j = 0; j < data[i].Queue.length; j++){
                     counter++;
               }
               queuelen.push(counter);
            }

            for(i = 0; i<name.length; i++){
                desc = `Queue Name: ${name[i]}, Length: ${queuelen[i]} \n`
            }

            const embed = new MessageEmbed()
                .setTitle(`List of Saved Queues in ${interaction.guild.name}`)
                .setDescription(desc)
                .setColor(client.color.aquamarine)

            interaction.followUp({embeds:[embed]})

        })

            
        

    
    }
}