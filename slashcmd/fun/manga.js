const { MessageActionRow, MessageButton, MessageEmbed, Client, CommandInteraction, MessageSelectMenu } = require('discord.js');
const { ButtonStyle, ComponentType } = require('discord-api-types/v9');
const { nanoid } = require("nanoid")
const Kitsu = require('kitsu');
const api = new Kitsu();
const moment = require('moment');


module.exports = {
    name: "manga",
    description: "Search for a manga.",
    options: [
        {
            name: "search",
            description: "Search for a manga",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "manga",
                    description: "The manga to search for",
                    type: "STRING"
                },
            ],
        },
    ],
    run: async(client, interaction) => {
        const manga = interaction.options.getString("manga");

        const { data } = await api.get('manga', { params: { filter: { text: manga } } });
        if(data.length === 0) return interaction.reply({ content: "Nothing was found for the requested manga!" });

        const selectId = `select-${nanoid()}`;
        const select = new MessageActionRow()
            .addComponents(new MessageSelectMenu()
                .setCustomId(selectId)
                .setPlaceholder("Select a manga!")
                .addOptions(data.map(res => ({
                    label: Object.values(res.titles)[0]|| 'Unknown Name',
                    description: res.description.substring(0, 100),
                    value: res.slug,
                }))));


        return interaction.editReply({ content: `I found ${data.length} possible matches, please select one of the following:`, components: [select] }).then(message => {
            const filter = (i) => i.customId === selectId;
            const collector = message.createMessageComponentCollector({ filter, componentType: ComponentType.SelectMenu, time: 60_000 });

            collector.on('collect', async(i) => {
                if (i.user.id !== interaction.user.id) return i.deferUpdate();
				await i.deferUpdate();

				const [choices] = i.values;
				const result = data.find(x => x.slug === choices);
				const button = new MessageActionRow()
					.addComponents(new MessageButton()
						.setStyle(ButtonStyle.Link)
						.setLabel('Open in Browser')
						.setURL(`https://kitsu.io/manga/${result.slug}`));


                const embed = new MessageEmbed()
                .setColor("36393E")
					.setTitle(result.titles.en_jp || Object.values(result.titles)[0])
					.setThumbnail(result.posterImage?.original)
					.addField('__Details__', [
						`***English:*** ${result.titles.en ? result.titles.en : '`N/A`'}`,
						`***Japanese:*** ${result.titles.ja_jp ? result.titles.ja_jp : '`N/A`'}`,
						`***Synonyms:*** ${result.abbreviatedTitles.length > 0 ? result.abbreviatedTitles.join(', ') : '`N/A`'}`,
						`***Score:*** ${result.averageRating ? result.averageRating : '`N/A`'}`,
						`***Rating:*** ${result.ageRating ? result.ageRating : '`N/A`'}${result.ageRatingGuide ? ` - ${result.ageRatingGuide}` : ''}`,
						`***Type:*** ${result.mangaType ? result.mangaType === 'oel' ? result.mangaType.toUpperCase() : result.mangaType.toString() : '`N/A`'}`,
						`***Volumes:*** ${result.volumeCount ? result.volumeCount : '`N/A`'}`,
						`***Chapters:*** ${result.chapterCount ? result.chapterCount : '`N/A`'}`,
						`***Status:*** ${result.status ? result.status === 'tba' ? result.status.toUpperCase() : result.status.toString() : '`N/A`'}`,
						`***Published:*** ${result.startDate ? `${moment(result.startDate).format('MMM D, YYYY')} to ${result.endDate ? moment(result.endDate).format('MMM D, YYYY') : '?'}` : '`N/A`'}`,
						`***Serialization:*** ${result.serialization ? result.serialization : '`N/A`'}`
					].join('\n'))
					.setImage(result.coverImage?.small)
                return i.editReply({ content: '\u200B', embeds: [embed], components: [button] });
            })

            collector.on('end', (collected, reason) => {
				if ((collected.size === 0 || collected.filter(x => x.user.id === interaction.user.id).size === 0) && reason === 'time') {
					return interaction.deleteReply();
				}
        })
    })
    }
}