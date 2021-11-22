const { CommandInteraction, Client, MessageEmbed} = require('discord.js')
const fs = require('fs');


module.exports = {
    name: 'playrecord',
    description:'Plays Recording in VC',
    options: [
        {
            name:'name',
            description:'Name of recording',
            type:'STRING',
            required: true,
        }
    ],
    run:async(client, interaction) => {
        const voicechannel = interaction?.member?.voice.channel;

        const name = interaction.options.getString('name');

        if (!voicechannel) return interaction.followUp(`
        ➔ Please join a Voice Channel to start the record and run the command again!\n
        ➔ The name of the recording must be specified correctly to identify and run the recording\n
        `);

        if (!fs.existsSync(`./recordings-${name}.pcm`)) return interaction.followUp(`
        ⚠️ You have not recorded any Audio yet, please run {record\n
        🔇 Make sure you have a working Mic!
        `);

        const connection = await interaction?.member?.voice.channel.join();
        const stream = fs.createReadStream(`./recordings-${name}.pcm`);
        
        const dispatcher = connection?.play(stream, {
                type:'converted'
        })

        dispatcher.on('finish', () => {
            interaction?.member?.voice?.channel?.leave();
            return interaction.followUp(`
            ✅ Finished recording Voice Audio, run play-audio\n
            🚫 Content is only available until the next recording.`);
        })
        

    }
    
}