const { Aki } = require("aki-api")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const isPlaying = new Set()

module.exports = {
    name: "akinator",
    description: "Starts a game of Akinator.",
    async execute(message, args,client){

     try{
		await message.channel.sendTyping();
        if (isPlaying.has(message.author.id)) return message.reply("You are already playing a game of Akinator. Please complete or cancel that game to start a new game.").catch(err => { })

        isPlaying.add(message.author.id)



        const region = 'en'
        const childMode = false
        const proxy = undefined

        const aki = new Aki({ region, childMode, proxy })

        const waitEmbed = new MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setTitle("Please Wait")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Starting a new game of Akinator for ${message.author.tag}!`)
            .setColor("RANDOM")
            .setFooter({ text: `Akinator game requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

        const waitMessage = await message.reply({ embeds: [waitEmbed] })

        await aki.start()

        const startEmbed = new MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setTitle(`Question ${aki.currentStep + 1}`)
            .addFields(
                {
                    name: "Question",
                    value: `${aki.question}`
                },
                {
                    name: "Progress",
                    value: `${aki.progress}%`
                }
            )
            .setColor("RANDOM")
            .setFooter({ text: `Akinator game requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("Yes")
                .setEmoji("✅")
                .setCustomId("y"),

            new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("No")
                .setEmoji("❌")
                .setCustomId("n"),

            new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("Don't Know")
                .setEmoji("❓")
                .setCustomId("idk")
        )

        const row2 = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("Probably")
                .setEmoji("🤔")
                .setCustomId("pb"),

            new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("Probaby Not")
                .setEmoji("🙄")
                .setCustomId("pn"),

            new MessageButton()
                .setStyle("DANGER")
                .setLabel("Stop")
                .setEmoji("🛑")
                .setCustomId("stop"),
        )

        const startMessage = await waitMessage.edit({ embeds: [startEmbed], components: [row1, row2] })

        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.reply({
                content: `Only ${message.author.tag} can use this interaction!`,
                ephemeral: true,
            });
        };

        const collector = startMessage.createMessageComponentCollector({
            filter,
            componentType: "BUTTON",
            time: 60000 * 5
        })

        collector.on("collect", async (interaction) => {
            if (interaction.customId === "y") {
                await aki.step(0)
            }
            if (interaction.customId === "n") {
                await aki.step(1)
            }
            if (interaction.customId === "idk") {
                await aki.step(2)
            }
            if (interaction.customId === "pb") {
                await aki.step(3)
            }
            if (interaction.customId === "pn") {
                await aki.step(4)
            }
            if (interaction.customId === "stop") {

                row1.components[0].setDisabled(true)
                row1.components[1].setDisabled(true)
                row1.components[2].setDisabled(true)
                row2.components[0].setDisabled(true)
                row2.components[1].setDisabled(true)
                row2.components[2].setDisabled(true)

                await startMessage.edit({ content: "This game has been stopped", components: [row1, row2] })

                collector.stop()
                isPlaying.delete(message.author.id)
            }

            if (aki.progress >= 90 || aki.currentStep >= 48) {
                await aki.win()

                collector.stop()
                isPlaying.delete(message.author.id)

                const guessEmbed = new MessageEmbed()
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                    .setTitle("Is this your character?")
                    .setDescription(`**Name:** ${aki.answers[0].name}\n\n${aki.answers[0].description}`)
                    .setImage(aki.answers[0].absolute_picture_path)
                    .setColor("RANDOM")
                    .setFooter({ text: `Akinator game requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

                const row3 = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setStyle("SUCCESS")
                        .setLabel("Yes")
                        .setEmoji("✅")
                        .setCustomId("yes"),

                    new MessageButton()
                        .setStyle("DANGER")
                        .setLabel("No")
                        .setEmoji("❌")
                        .setCustomId("no"),
                )

                const guessMessage = await interaction.update({ embeds: [guessEmbed], components: [row3] })

                const buttoncollector = startMessage.createMessageComponentCollector({
                    filter,
                    componentType: "BUTTON",
                    time: 60000
                })

                buttoncollector.on("collect", async (interaction) => {
                    if (interaction.customId === "yes") {
                        const yesEmbed = new MessageEmbed()
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                            .setTitle("Guessed it correctly!")
                            .addFields(
                                {
                                    name: `Name`,
                                    value: `${aki.answers[0].name}`,
                                    inline: true
                                },
                                {
                                    name: `Description`,
                                    value: `${aki.answers[0].description}`,
                                    inline: true
                                },
                                {
                                    name: `Ranking`,
                                    value: `${aki.answers[0].ranking}`,
                                    inline: true
                                }
                            )
                            .setColor("#39FF14")
                            .setThumbnail(client.user.displayAvatarURL())
                            .setImage(aki.answers[0].absolute_picture_path)
                            .setFooter({ text: `Akinator game requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

                        row3.components[0].setDisabled(true)
                        row3.components[1].setDisabled(true)

                        interaction.update({ embeds: [yesEmbed], components: [row3] })
                    }
                    if (interaction.customId === "no") {
                        const yesEmbed = new MessageEmbed()
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                            .setTitle("You win!")
                            .setDescription(`You win this time, but I will definitely with the next time!\n\nWell Played!`)
                            .setColor("#FF0000")
                            .setThumbnail(client.user.displayAvatarURL())
                            .setFooter({ text: `Akinator game requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

                        row3.components[0].setDisabled(true)
                        row3.components[1].setDisabled(true)

                        interaction.update({ embeds: [yesEmbed], components: [row3] })
                    }
                })
            } else {
                const continueEmbed = new MessageEmbed()
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                    .setTitle(`Question ${aki.currentStep + 1}`)
                    .addFields(
                        {
                            name: "Question",
                            value: `${aki.question}`
                        },
                        {
                            name: "Progress",
                            value: `${aki.progress}%`
                        }
                    )
                    .setColor("RANDOM")
                    .setFooter({ text: `Akinator game requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

                interaction.update({ embeds: [continueEmbed], components: [row1, row2] })
            }
        })

     }catch(err){
         message.channel.send("Stopping Game Due to Command Error, Please Wait a Few Minutes Before Restarting")
     }
    }
}
