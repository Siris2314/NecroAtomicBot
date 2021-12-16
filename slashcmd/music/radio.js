const { Message, MessageActionRow, MessageSelectMenu } = require('discord.js');
const {
	joinVoiceChannel,
	createAudioResource,
	createAudioPlayer,
} = require('@discordjs/voice');
const radioAssets = require('../../radio.json');


module.exports = {

    name: 'radio',
    description: 'Play a radio station',
    options:[
        {
            name:'station',
            description:'The name of the radio station',
            type:'STRING',
            required:true
        }
    ],

    run: async(client, interaction) => {

        const channel = interaction.member.voice.channel;

        if(!channel){
            return interaction.followUp({content:'Must be in this VC to use this command'});
        }

        const getRadioChannel = radioAssets.channel.map((rad) => ({
		
			label: rad.nativeName,
			value: rad.name,
		}));

        const radioMenu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('radioList')
				.setPlaceholder('Select a radio channel!')
				// Set it as the options, so the user can choose.
				.addOptions(getRadioChannel),
		);

        const msg = await interaction.followUp({
            content: 'Please select one of the Radio channel that are listed below!',
			components: [radioMenu],
        })

        const filter = (interaction) => {
			if (
				!interaction.user.id ||
				interaction.customId !== 'radioList'
			) {
				interaction.reply({
					content: 'This menu is not for you!',
					ephemeral: true,
				});
				return false;
			} else {
				return true;
			}
		};

        const collector = msg.createMessageComponentCollector({
			filter,
			time: 30000,
		});

        collector.on('collect', async (interaction) => {
			// Find a radio name that match to the value that we set up before.
			const findRadio = radioAssets.channel.find(
				(rad) => rad.name === interaction.values.toString(),
			);

			const player = createAudioPlayer();
			// If we got the radio correctly, then get the radio uri.
			const resource = createAudioResource(findRadio.uri);

			// Make it connect to the voice channel
			let connection = joinVoiceChannel({
				guildId: interaction.guild.id,
				channelId: channel.id,
				adapterCreator: interaction.guild.voiceAdapterCreator,
				selfDeaf: true,
				selfMute: false,
			});

			// And this should play the audio
			player.play(resource);
			connection.subscribe(player);

			// You can remove this, but msg "This interaction failed" should appeared, so if you keep this, that msg shouldn't appear
			await interaction.followUp({
				content: 'Radio has started successfully!',
				ephemeral: true,
			});

			// And you are done.
			await interaction
				.channel.send({
					content: `Started playing **${findRadio.nativeName}** in <#${channel.id}>`,
				})
				// Make the bot set suppressed to false if the initial command being used in stage channel
				// KNOWN BUG: if the bot moved to stage channel it does not make the suppress to false.
				.then((interaction) => interaction.guild.me.voice.setSuppressed(false))
				// Error known because the user are not in a stage channel
				// "You are only allowed to do this in stage channels"
				.catch((err) => console.err(err));
		});






    }
}