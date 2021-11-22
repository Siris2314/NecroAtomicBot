const { CommandInteraction, Client, MessageEmbed} = require('discord.js')
const fs = require('fs');

module.exports = {
    name:'record',
    description:'Records stuff in VC',
    options:[
        {
            name:'name',
            description:'Name of the recording',
            type:'STRING',
            required:true
        }
    ],

    run: async (client, interaction) => {
        const name = interaction.options.getString('name');
        const voiceChannel = interaction?.member?.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to use this command.');
        }
        const permissions = voiceChannel.permissionsFor(interaction.guild.me);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return interaction.reply('I need the permissions to join and speak in that voice channel.');
        }

        const voicechannel = interaction?.member?.voice.channel;
        const connection = await interaction?.member?.voice.channel.join();
        const receiver  = connection?.receiver.createStream(interaction.member, {
            mode: 'pcm',
            end:'silence'
        })

        const writer = receiver?.pipe(fs.createWriteStream(`./recordings-${name}.pcm`));
        writer.on('finish', () => {
            interaction?.member?.voice?.channel?.leave();
            interaction.followUp("Finished Writing Audio, saved in recordings")
        })


       
    }
}