const Akinator = require('../../classes/akinatorclass.js')
const {MessageEmbed, Client, CommandInteraction} = require('discord.js')

module.exports = {

    name: 'akinator',
    description: 'Akinator Game! 🧞',
    options: [{
        name: 'language',
        description: 'Select the language you prefer. (default: English)',
        type: 'STRING',
        required: false,
        choices: [{
            name: 'English',
            value: 'en'
        }, {
            name: 'Arabic',
            value: 'ar'
        }, {
            name: 'Spanish',
            value: 'es'
        }, {
            name: 'French',
            value: 'fr'
        }, {
            name: 'Italian',
            value: 'it'
        }, {
            name: 'Japanese',
            value: 'jp'
        }, {
            name: 'Russian',
            value: 'ru'
        }, {
            name: 'Portuguese',
            value: 'pt'
        }, {
            name: 'Turkish',
            value: 'tr'
        }, {
            name: 'Chinese',
            value: 'cn'
        }]
    }],

    run:async(client, interaction) => {

        const language = interaction.options.getString('language') || 'en'

        const akinator = new Akinator(language)

        await akinator.start()

        await interaction.editReply({
            components: [akinator.component],
            embeds: [akinator.embed]
        })

        const filter = (i) => i.user.id === interaction.user.id

        const channel = await client.channels.fetch(interaction.channelId)

        while(!akinator.ended) try {
            await akinator.ask(channel, filter)
            if(!akinator.ended) await interaction.editReply({
                components: [akinator.component],
                embeds: [akinator.embed]
            })
        } catch(e) {
            if(e instanceof Error) console.log(e)

            return await interaction.editReply({
                components: [],
                embeds: [],
                content:'Game timeout'
            })
        }


        await akinator.stop()

        await interaction.editReply({
            components: [],
            embeds: [akinator.embed]
        })


    }




}