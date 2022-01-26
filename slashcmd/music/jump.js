const {Client, CommandInteraction, MessageEmbed} = require('discord.js');

module.exports = {
    name:'jump',
    description:'Jump to a specific song in the queue',
    options:[
        {
            name:'index',
            description:'The index of the song to jump to',
            type:'NUMBER',
            required:true
        }
    ],
    run:async(client,interaction) => {


        const vc = interaction.member.voice.channel
    
        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        let index = interaction.options.getNumber('index')

        if(index <= 0) return interaction.followUp({content:`Cannot have smaller than 0 index`})

        if(index == 1) return interaction.followUp({content:`You are already playing the first song`})

        if(index > queue.songs.length) return interaction.followUp({content:`Index ${index} is out of range`})

        while(index){
            await queue.skip();
            index--;
        }
        return interaction.followUp({content:`Now Playing: ${queue.songs[1].name}`})

    }
}