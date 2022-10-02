const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const { createWorker } = require("tesseract.js")


module.exports = {

    name: 'pictotext',
    description: 'Converts image to text',
    options: [


        {
        name: 'image',
        description: 'The image to convert to text',
        type: 'ATTACHMENT',
        required: true
        }
    ],

    run: async (client, interaction) => {


        const image = interaction.options.getAttachment('image')

            
        try {
            const worker = createWorker()

            await worker.load().catch((err) => {
                console.log(err)
            })
            await worker.loadLanguage("eng").catch((err) => {
                console.log(err)
            })
            await worker.initialize("eng").catch((err) => {
                console.log(err)
            })
            const {
                data: { text },
            } = await worker.recognize(image.url).catch((err) => {
                console.log(err)
            })
            await worker.terminate().catch((err) => {
                console.log(err)
            })

            await interaction
                .followUp({
                    content: `${text}`,
                })
                .catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }


    }





}