const { MessageEmbed, MessageActionRow, MessageButton }  = require('discord.js')
const { Aki } = require('aki-api')

const emojis = ['👍', '👎', '❔', '🤔', '🙄', '❌']


class Akinator {
    constructor(region = 'en') {
        this.api = new Aki({ region })
    }

    get answers() {
        return this.api.answers
    }

    get question() {
        return this.api.question
    }

    get score() {
        return this.api.currentStep
    }

    get ended() {
        return this.api.progress >= 70 || this.api.currentStep >= 78
    }

    async start() {
        await this.api.start()
    }

    async stop() {
        await this.api.win()
    }

    async ask(channel, filter) {
        const collector = channel.createMessageComponentCollector({ filter, time: 30_000 })
        return new Promise((resolve, reject) => {
            collector
                .on('collect', async ctx => {
                    await ctx.deferUpdate()

                    const answer = Number(ctx.customId)

                    await this.api.step(answer)

                    collector.stop()
                })
                .on('end', (_, reason) => {
                    if (reason === 'time') {
                        reject()
                    } else {
                        resolve()
                    }
                })
        })
    }

    get embed() {
        if (this.ended) {
            const someone = this.answers[0]
            return new MessageEmbed()
                .setTitle('Is this your character?')
                .setDescription(`**${someone.name}**\n${someone.description}\nRanking as **#${someone.ranking}**`)
                .setImage(someone.absolute_picture_path)
                .setColor('RANDOM')
        }

        return new MessageEmbed()
            .setTitle(`${this.score + 1}. ${this.question}`)
            .setColor('RANDOM')
            .setFooter({ text: 'You have 30 seconds to answer.' })
    }

    get component() {
        const row = new MessageActionRow()

        const buttons = this.answers.map((answer, index) => {
            return new MessageButton()
                .setEmoji(emojis[index])
                .setLabel(answer)
                .setStyle('PRIMARY')
                .setCustomId(index.toString())
        })

        row.addComponents(buttons)

        return row
    }
}

module.exports = Akinator