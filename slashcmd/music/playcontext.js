const {Client, CommandInteraction, ContextMenuInteraction} = require('discord.js')

module.exports = {
    name:'playcontext',
    type:'MESSAGE',

    /**
     * 
     * 
     * 
     * 
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * 
     * 
     */


    run: async (client, interaction) => {

        const msg = await interaction.channel.messages.fetch(interaction.targetId);

        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to play command'})



        let queue = client.player.createQueue(interaction.guild.id,  {
            data: interaction});
        await queue.join(vc)


        const query = String(msg);



       if(query.includes('https://open.spotify.com/playlist/') || query.includes('https://www.youtube.com/playlist') || query.includes("https://open.spotify.com/album")){
        let song = await queue.playlist(query).catch(_ => {
            if(!queue)
                queue.stop();
        });
        interaction.followUp({content:'Queueing your songs......'})
        }   else {
        let song = await queue.play(query).catch(_ => {
            data: { custom: 'fields' }
            if(!queue)
                queue.stop();
        });
        interaction.followUp({content:'Queueing your songs......'})


    }
}
}