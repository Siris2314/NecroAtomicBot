const {CommandInteraction, Client, MessageEmbed} = require('discord.js');

module.exports = {
    name:'removedupes',
    description:'Removes Duplicate Songs From a Queue',
    run:async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);
        if(!queue){
            return interaction.followUp({content:'Music Bot is currently not playing'})
        }
        if(queue.songs.length == 1){
            return interaction.followUp({content:'Cannot remove dupes from a 1 song queue'})
        }

        const uniquesongs = []

        queue.songs.filter((song, i) => uniques.inludes(song.url) ? false : (uniques.push(song.url), true))

        queue.songs = uniquesongs

        return interaction.followUp({content:'Removed Duplicates from your queue'})





    }
}