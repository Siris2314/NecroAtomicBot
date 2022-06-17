const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {

    name:'screenshot',
    description: 'Take a screenshot of a website',
    options: [
        {
            name: 'url',
            description: 'The url of the website to take a screenshot of',
            type:'STRING',
            required: true
        }
    ],


    run:async(client, interaction) => {
        let url = interaction.options.getString('url')
        try {
            if (url.length < 8)
            return interaction.followUp(`"https is too short to reach - 8 limit"`)

            const site = /^(https?:\/\/)/i.test(url) ? url : `http://${url}`

            const { body } = await fetch(`https://image.thum.io/get/width/1950/crop/700/noanimate/${site}`)


            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .addField(`Screenshotted!`, `[The site](${site})`)
                    .setImage(`attachment://screenshot.png`)
                ],
                files: [ body ]
            })
        } catch(err) {
            interaction.followUp(`Error: ${err}`)
        }
    }

}