const { CommandInteraction, Client, MessageEmbed} = require('discord.js')
const JSZip = require('jszip')
const fetch = require('node-fetch')

module.exports = {
    name: 'transcript',
    description: 'Get transcripts from a channel',
    permission:'ADMINISTRATOR',
    options: [

        {
            name:'channel',
            description:'Select the channel you want to get transcripts from',
            type:'CHANNEL',
            required:true
        }


    ],

    run:async(client, interaction) => {
        let channel = interaction.options.getChannel('channel')
        channel.messages.fetch({ limit: 100 }).then(async fetched => {
            let mapped = fetched.map(msg => `[${msg.createdAt.toLocaleString()}] ${msg.author.tag} (${msg.author.id}): ${msg.embeds[0] ? JSON.stringify(msg.embeds[0]) : msg.content ? msg.content : msg.attachments.map(g => g.url)}`)
            let reversedMapped = [];

            for (let i = mapped.length; i = i; i--) {
                reversedMapped.push(mapped[i - 1])
            }

            const text = new MessageAttachment(Buffer.from(reversedMapped.join("\n")), `transcript-${channel.name}.txt`);
            const att = fetched.map(g => g.attachments)
            const files = new JSZip();
            let hasAttachment = false
            for (let messageAttachments of att) {
                for (let data of messageAttachments.values()) {
                    hasAttachment = true
                    let attachment = await fetch(data.url).then(r => r.buffer())
                    files.file(`${attachment.name}`, attachment);
                }
            }

            const buffer = await files.generateAsync({ type: "arraybuffer" })
            const attachments = new MessageAttachment(Buffer.from(buffer), `attachments-${channel.name}.zip`);
            hasAttachment ? interaction.followUp({ files: [attachments, text] }) : interaction.followUp({ files: [text] })

        })

    }
}