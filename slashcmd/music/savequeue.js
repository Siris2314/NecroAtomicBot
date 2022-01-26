const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/queueSchema');

module.exports = {

    name: 'savequeue',
    description:'Saves Current Server Queue(Max 30 Songs and Max 10 Queues)',
    options: [
        {
            name:'name',
            description:'Name of the Queue to Save',
            type:'STRING',
            required:true
        }
    ],

    run: async (client, interaction) => {

        const vc = interaction.member.voice.channel;

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'});

        let queue = client.player.getQueue(interaction.guild.id);

        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        let songs = queue.songs;

        let name = interaction.options.getString('name');

        if(songs.length == 1){
            return interaction.followUp({content:`Cannot Save Queues with 1 Song`})
        }
    
        if(songs.length > 30){
            return interaction.followUp({content:'Queue is too long to save'});
        }
        else{

            let links = [];

            for(let i = 0; i < songs.length; i++){
                links.push(songs[i].url);
            
     }

            await Schema.findOne({Guild: interaction.guild.id, Name:name}, async(err, data)=>{
                if(data) data.delete();
                new Schema({
                    Guild: interaction.guild.id,
                    Name:name,
                    Queue:links
                }).save();
            })


            return interaction.followUp({content:`Saved queue ${name}, to load this queue, use /loadqueue ${name}`});

        }



    }
}