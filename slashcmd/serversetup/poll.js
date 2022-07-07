const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const pollSchema = require('../../schemas/poll')
module.exports = {
    name: 'poll',
    description: 'Creates a poll with many options',
    options: [
        {
            name: 'title',
            description: 'The title of poll',
            type: 'STRING',
            required: true,
        },
        {
            name: 'choice1',
            description: 'A choice',
            type: 'STRING',
            required: true,
        },
        {
            name: 'choice2',
            description: 'A choice',
            type: 'STRING',
            required: true,
        },
        {
            name: 'choice3',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
        {
            name: 'choice4',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
        {
            name: 'choice5',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
        {
            name: 'choice6',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
        {
            name: 'choice7',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
        {
            name: 'choice8',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
        {
            name: 'choice9',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
        {
            name: 'choice10',
            description: 'A choice',
            type: 'STRING',
            required: false,
        },
    ],
    run: async (client, interaction) => {
        title = interaction.options.getString('title');
        c1 = interaction.options.getString('choice1');
        c2 = interaction.options.getString('choice2');
        c3 = interaction.options.getString('choice3');
        c4 = interaction.options.getString('choice4');
        c5 = interaction.options.getString('choice5');
        c6 = interaction.options.getString('choice6');
        c7 = interaction.options.getString('choice7');
        c8 = interaction.options.getString('choice8');
        c9 = interaction.options.getString('choice9');
        c10 = interaction.options.getString('choice10');

        if (title.length > 255) return interaction.followUp({ content: `Keep The Title Under \`255\` Characters`, ephemeral: true });
        if (c1.length > 1023) return interaction.followUp({ content: `Keep The Choice 1 Under \`1023\` Characters`, ephemeral: true });
        if (c2.length > 1023) return interaction.followUp({ content: `Keep The Choice 2 Under \`1023\` Characters`, ephemeral: true });
        if (c3?.length > 1023) return interaction.followUp({ content: `Keep The Choice 3 Under \`1023\` Characters`, ephemeral: true });
        if (c4?.length > 1023) return interaction.followUp({ content: `Keep The Choice 4 Under \`1023\` Characters`, ephemeral: true });
        if (c5?.length > 1023) return interaction.followUp({ content: `Keep The Choice 5 Under \`1023\` Characters`, ephemeral: true });
        if (c6?.length > 1023) return interaction.followUp({ content: `Keep The Choice 6 Under \`1023\` Characters`, ephemeral: true });
        if (c7?.length > 1023) return interaction.followUp({ content: `Keep The Choice 7 Under \`1023\` Characters`, ephemeral: true });
        if (c8?.length > 1023) return interaction.followUp({ content: `Keep The Choice 8 Under \`1023\` Characters`, ephemeral: true });
        if (c9?.length > 1023) return interaction.followUp({ content: `Keep The Choice 9 Under \`1023\` Characters`, ephemeral: true });
        if (c10?.length > 1023) return interaction.followUp({ content: `Keep The Choice 10 Under \`1023\` Characters`, ephemeral: true });

        const pollCreateEmbed = new MessageEmbed()
            .setTitle(`**${title}**`)
            .setColor("#6F8FAF")
            .addFields(
                {
                    value: '\u200b', name: `1️⃣ ${c1}`,
                },
                {
                    value: '\u200b',
                    name: `2️⃣ ${c2}`
                }
            )
            .setTimestamp();

        if (interaction.options.getString('choice3')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `3️⃣ ${c3}`,
            });
        }
        if (interaction.options.getString('choice4')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `4️⃣ ${c4}`,
            });
        }
        if (interaction.options.getString('choice5')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `5️⃣ ${c5}`
            });
        }
        if (interaction.options.getString('choice6')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `6️⃣ ${c6}`,
            });
        }
        if (interaction.options.getString('choice7')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `7️⃣ ${c7}`,
            });
        }
        if (interaction.options.getString('choice8')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `8️⃣ ${c8}`,
            });
        }
        if (interaction.options.getString('choice9')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `9️⃣ ${c9}`,
            });
        }
        if (interaction.options.getString('choice10')) {
            pollCreateEmbed.addFields({
                value: '\u200b',
                name: `🔟 ${c10}`,
            });
        }

        const buttons = [];
        const rows = [];

        buttons.push({
            emoji: '1️⃣',
            label: '0',
            style: 'PRIMARY',
            custom_id: `poll1`,
            disabled: false,
            type: 2,
        })
        buttons.push({
            emoji: '2️⃣',
            label: '0',
            style: 'PRIMARY',
            custom_id: `poll2`,
            disabled: false,
            type: 2,
        })

        if (interaction.options.getString('choice3')) {
            buttons.push({
                emoji: '3️⃣',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll3`,
                disabled: false,
                type: 2,
            })
        }
        if (interaction.options.getString('choice4')) {
            buttons.push({
                emoji: '4️⃣',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll4`,
                disabled: false,
                type: 2,
            })
        }
        if (interaction.options.getString('choice5')) {
            buttons.push({
                emoji: '5️⃣',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll5`,
                disabled: false,
                type: 2,
            })
        }
        if (interaction.options.getString('choice6')) {
            buttons.push({
                emoji: '6️⃣',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll6`,
                disabled: false,
                type: 2,
            })
        }
        if (interaction.options.getString('choice7')) {
            buttons.push({
                emoji: '7️⃣',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll7`,
                disabled: false,
                type: 2,
            })
        }
        if (interaction.options.getString('choice8')) {
            buttons.push({
                emoji: '8️⃣',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll8`,
                disabled: false,
                type: 2,
            })
        }
        if (interaction.options.getString('choice9')) {
            buttons.push({
                emoji: '9️⃣',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll9`,
                disabled: false,
                type: 2,
            })
        }
        if (interaction.options.getString('choice10')) {
            buttons.push({
                emoji: '🔟',
                label: '0',
                style: 'PRIMARY',
                custom_id: `poll10`,
                disabled: false,
                type: 2,
            })
        }

        for (let i = 0; i < Math.ceil(buttons.length / 5); i++) {
            rows.push(new MessageActionRow());
        }

        rows.forEach((row, i) => {
            row.addComponents(buttons.slice(0 + (i * 5), 5 + (i * 5)));
        });

        embedMessage = await interaction.followUp({
            content: `📊 ${interaction.user} started a poll`,
            embeds: [pollCreateEmbed],
            components: rows,
            fetchReply: true
        }).catch(e => { })


        await pollSchema.create({
            messageId: embedMessage.id
        })

    },
};