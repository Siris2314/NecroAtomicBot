const {CommandInteraction, Client, MessageEmbed} = require('discord.js')


module.exports = {
    name: 'move',
    description: 'Moves a song to a specific position in the queue',
    options: [
        {
            name: 'song',
            description: 'The song to move',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'position',
            description: 'The position to move the song to',
            type: 'INTEGER',
            required: true
        }

    ],

    run: async (client, interaction) => {

        const vc = interaction.member.voice.channel;

        if (!vc) {
            return interaction.followUp({
                content: 'You must be in a voice channel to use this command!'})
        }

        const query = interaction.options.getInteger('song');
        const position = interaction.options.getInteger('position');


        let queue = client.player.getQueue(interaction.guild.id);

        if (!queue) {

            return interaction.followUp({
                content: 'There is no song playing in VC!'})
        }
        else if(position == 0){
            return interaction.followUp({
                content: 'You cannot move a song to position 0!'})
        }
        else if(queue.songs.length < position) {
            return interaction.followUp({
                content: 'The position you specified is out of range!'})
        }
        else if(queue.songs.length == 1){
            return interaction.followUp({
                content: 'There is only one song in the queue!'})
        }



        // queue.move(query, position);

        interaction.followUp({
            content: `Moved song ${query} to position ${position}!`})

    




        
        

        
}
}