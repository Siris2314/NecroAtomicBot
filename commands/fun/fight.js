module.exports = {
    name: 'fight',
    description: 'Fight someone in the old dank memer style!',

    async execute(message, args,client) {
        if (!args[0])
            return message.channel.send('You must mention someone to fight!')
        const player1 = message.member.id
        const mention =
            message.mentions.users.size > 0
                ? message.mentions.users.first()
                : false
        if (mention.bot) return message.channel.send('Cant fight bots.')
        if (!mention)
            return message.channel.send(
                'You must mention someone to fight with them.'
            )
        const player2 = mention.id
        const player1username = message.author.username
        const player2username = message.mentions.users.first().username

        const filter = (m) => m.author.id === player1 || m.author.id === player2
        let player1hp = 100
        let player2hp = 100
        let turnID = player1
        let opponentID = player2
        let randNum
        const collector = message.channel.createMessageCollector(filter, {
            max: 100,
        })

        message.channel.send(
            `<@${player1}> what do you want to do?\nReply with \`punch\`, \`kick\`, \`heal\` or \`end\`.`
        )
        collector.on('collect', (msg) => {
            if (msg.author.id === player1 && turnID === player1) {
                if (checkDeath(player1hp)) {
                    message.channel.send(
                        `:trophy: | **${player2username}** has won the fight with **${player2hp} HP** left!`
                    )
                    collector.stop()
                }
                if (
                    !['heal', 'kick', 'punch', 'end'].includes(
                        msg.content.toLowerCase()
                    )
                ) {
                    message.channel.send(
                        `<@${player1}> thats not a valid option. Try again! \nReply with \`punch\`, \`kick\`, \`heal\` or \`end\`.`
                    )
                } else {
                    let action = msg.content.toLowerCase()
                    if (action === 'punch') {
                        //punch
                        randNum = Math.floor(Math.random() * 20) + 5
                        player2hp -= randNum
                        message.channel.send(
                            `**PUNCH** | **${player1username}** lands a punch on **${player2username}** and deals **${randNum}** damage!\n${player2username} is left with ${player2hp} hp.`
                        )

                        message.channel.send(
                            `<@${player2}> its your turn!\nWhat do you want to do?`
                        )
                        if (checkDeath(player2hp)) {
                            message.channel.send(
                                `:trophy: | **${player1username}** has won the fight with **${player1hp}** left!`
                            )
                            return collector.stop()
                        }
                        turnID = player2
                    } else if (action === 'kick') {
                        //kick
                        let fall
                        let fallChances = [0, 1, 1, 1]
                        let rand = Math.floor(
                            Math.random() * fallChances.length
                        )
                        if (fallChances[rand] === 0) {
                            fall = true
                        } else {
                            fall = false
                        }

                        if (fall) {
                            let falldmg = Math.floor(Math.random() * 8) + 12
                            player1hp -= falldmg

                            message.channel.send(
                                `**FALL** | **${player1username}** fell and took **${falldmg}** damage!\n${player1username} is left with ${player1hp} hp.`
                            )
                            if (checkDeath(player1hp)) {
                                message.channel.send(
                                    `:trophy: | **${player2username}** has won the fight with **${player2hp} HP** left!`
                                )
                                return collector.stop()
                            }
                            message.channel.send(`<@${player2}> its your turn!`)
                        } else {
                            randNum = Math.floor(Math.random() * 20) + 20
                            player2hp -= randNum
                            message.channel.send(
                                `**KICK** | **${player1username}** lands a successful kick on **${player2username}** and deals **${randNum}** damage!\n${player2username} is left with ${player2hp} hp.`
                            )
                            if (checkDeath(player2hp)) {
                                message.channel.send(
                                    `:trophy: | **${player1username}** has won the fight with **${player1hp} HP** left!`
                                )
                                return collector.stop()
                            }
                            message.channel.send(
                                `<@${player2}> its your turn!\nWhat do you want to do?\nReply with \`punch\`, \`kick\`, \`heal\` or \`end\`.`
                            )
                        }
                        turnID = player2
                    } else if (action === 'heal') {
                        //heal
                        randNum = Math.floor(Math.random() * 8) + 8
                        player1hp += randNum
                        message.channel.send(
                            `**HEAL** | **${player1username}** healed **${randNum} HP**\n${player1username} is at ${player1hp} hp.`
                        )
                        turnID = player2
                    } else if (action === 'end') {
                        //end
                        collector.stop()
                        return message.channel.send(
                            `<@${player1}> decided to stop the game!`
                        )
                    } else;
                }
            } else if (msg.author.id === player2 && turnID === player2) {
                if (checkDeath(player2hp)) {
                    message.channel.send(
                        `:trophy: | **${player1username}** has won the fight with **${player1hp} HP** left!`
                    )
                    return collector.stop()
                }
                if (
                    !['heal', 'kick', 'punch', 'end'].includes(
                        msg.content.toLowerCase()
                    )
                ) {
                    message.channel.send(
                        `<@${player2}> thats not a valid option. Try again!\nReply with \`punch\`, \`kick\`, \`heal\` or \`end\`.`
                    )
                } else {
                    let action = msg.content.toLowerCase()
                    if (action === 'punch') {
                        //punch
                        randNum = Math.floor(Math.random() * 20) + 5
                        player1hp -= randNum
                        message.channel.send(
                            `**PUNCH** | **${player2username}** lands a punch on **${player1username}** and deals **${randNum}** damage!\n${player1username} is left with ${player1hp} hp.`
                        )
                        if (checkDeath(player1hp)) {
                            message.channel.send(
                                `:trophy: | **${player2username}** has won the fight with **${player2hp} HP** left!`
                            )
                            return collector.stop()
                        }
                        message.channel.send(
                            `<@${player1}> its your turn!\nWhat do you want to do?\nReply with \`punch\`, \`kick\`, \`heal\` or \`end\`.`
                        )

                        turnID = player1
                    } else if (action === 'kick') {
                        //kick
                        let fall
                        let fallChances = [0, 1, 1, 1]
                        let rand = Math.floor(
                            Math.random() * fallChances.length
                        )
                        if (fallChances[rand] === 0) {
                            fall = true
                        } else {
                            fall = false
                        }

                        if (fall) {
                            let falldmg = Math.floor(Math.random() * 8) + 12
                            player2hp -= falldmg

                            message.channel.send(
                                `**FALL** | **${player2username}** fell and took **${falldmg}** damage!\n${player2username} is left with ${player2hp} hp.`
                            )
                            if (checkDeath(player2hp)) {
                                message.channel.send(
                                    `:trophy: | **${player1username}** has won the fight with **${player1hp} HP** left!`
                                )
                                return collector.stop()
                            }
                            message.channel.send(
                                `<@${player1}> its your turn!\nWhat do you want to do?\nReply with \`punch\`, \`kick\`, \`heal\` or \`end\`.`
                            )
                        } else {
                            randNum = Math.floor(Math.random() * 20) + 20
                            player1hp -= randNum
                            message.channel.send(
                                `**KICK** | **${player2username}** lands a successful kick on **${player1username}** and deals **${randNum}** damage!\n${player1username} is left with ${player1hp} hp.`
                            )
                            if (checkDeath(player1hp)) {
                                message.channel.send(
                                    `:trophy: | **${player2username}** has won the fight with **${player2hp} HP** left!`
                                )
                                return collector.stop()
                            }
                            message.channel.send(
                                `<@${player1}> its your turn!\nWhat do you want to do?\nReply with \`punch\`, \`kick\`, \`heal\` or \`end\`.`
                            )
                        }
                        turnID = player1
                    } else if (action === 'heal') {
                        //heal
                        randNum = Math.floor(Math.random() * 8) + 8
                        player2hp += randNum
                        message.channel.send(
                            `**HEAL** | **${player2username}** healed **${randNum} HP**\n${player2username} is at ${player2hp} hp.`
                        )
                        turnID = player1
                    } else if (action === 'end') {
                        //end
                        collector.stop()
                        return message.channel.send(
                            `<@${player2}> decided to stop the game!`
                        )
                    } else;
                }
            }
        })
    },
}

const checkDeath = (player) => {
    if (player <= 0) return true
    else return false
}