const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {

    name:'removesong',
    description:'Remove Song Depending on Queue Index(Number)',
    options:[
        {
            name:'number',
            description:'Song number to be removed',
            type:'NUMBER',
            required:true
        }
    ],

    run:async(client, interaction) => {

        const index = interaction.options.getNumber('number') -  1;

        let queue = client.player.getQueue(interaction.guild.id);

        if(index >= queue.songs.length){
            return interaction.followUp({content:`Index ${index} is out of range`, ephemeral: true})
        }
        else if(index < 0){
            return interaction.followUp({content:`Index ${index} is out of range`, ephemeral: true})



        }


        const song = queue.songs[index].name


        queue = queue.songs.splice(index, 1);

        return interaction.followUp({content:`Removed Song ${song} from queue`, ephemeral: true})


        




    }

}