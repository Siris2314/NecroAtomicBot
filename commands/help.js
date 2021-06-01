const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
require("dotenv").config();
const schema = require("../schemas/Guilds");
const token = process.env.token;
let prefix = process.env.prefix;
const paginationEmbed = require("discord.js-pagination");

module.exports = {
    name: "help",
    description: "Shows all available bot commands.",
    async execute(message, args, client) {
        await schema.findOne(
            { guildID: message.guild.id },
            async (err, data) => {
                if (!data) {
                    prefix = process.env.prefix;
                } else {
                    prefix = data.prefix;
                }
            }
        );

        const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
        var commands = {};
        readdirSync("./commands/").forEach((dir) => {
            if (dir.indexOf(".") == -1) {
                commands[dir] = readdirSync(`./commands/${dir}`);
            }
        });
        if (!args[0]) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle("📬 Need help? Here are all of my commands:")
                    .addFields(
                        {
                            name: "⚙ Administration",
                            value: "```" + prefix + " help administration```",
                        },
                        {
                            name: "🎮 Fun",
                            value: "```" + prefix + " help fun```",
                        },
                        {
                            name: "📜 Levels",
                            value: "```" + prefix + " help levels```",
                        },
                        {
                            name: "🎵 Music",
                            value: "```" + prefix + " help music```",
                        },
                        {
                            name: "🔒 Owner",
                            value: "```" + prefix + " help owner```",
                        },
                        {
                            name: "🛠 Utility",
                            value: "```" + prefix + " help utility```",
                        },
                        {
                            name: "✂ Work in Progress",
                            value: "```" + prefix + " help wip```",
                        }
                    )
                    .setDescription(
                        `Use \`${prefix} help\` followed by a command name to get more additional information on a command. For example: \`${prefix} help ban\`.`
                    )
                    .setTimestamp()
                    .setColor(roleColor)
            );
        } else {
            if (commands[args[0]] != undefined) {
                var temp = [];
                let categories = [];
                var counter = 0;
                readdirSync("./commands/" + args[0]).forEach((dir) => {
                    temp.push({
                        name: dir.substring(0, dir.indexOf(".")),
                        value: "\u200B",
                        inline: true,
                    });
                    counter++;
                    if (counter == 24) {
                        counter = 0;
                        categories.push(temp);
                        temp = [];
                    }
                });
                categories.push(temp);
                var listOfEmbed = [];
                if (categories.length <= 1) {
                    const a = new MessageEmbed()
                        .setTitle("📬 Need help? Here are all of my commands:")
                        .addFields(temp)
                        .setDescription(
                            `Use \`${prefix} help\` followed by a command name to get more additional information on a command. For example: \`${prefix} help ban\`.`
                        )
                        .setFooter(
                            `Requested by ${message.author.tag}`,
                            message.author.displayAvatarURL({
                                dynamic: true,
                            })
                        )
                        .setTimestamp()
                        .setColor(roleColor);
                    message.channel.send(a);
                } else {
                    for (var i = 0; i < categories.length; i++) {
                        listOfEmbed.push(
                            new MessageEmbed()
                                .setTitle(
                                    "📬 Need help? Here are all of my commands:"
                                )
                                .addFields(categories[i])
                                .setDescription(
                                    `Use \`${prefix} help\` followed by a command name to get more additional information on a command. For example: \`${prefix} help ban\`.`
                                )
                                .setFooter(
                                    `Requested by ${message.author.tag}`,
                                    message.author.displayAvatarURL({
                                        dynamic: true,
                                    })
                                )
                                .setTimestamp()
                                .setColor(roleColor)
                        );
                    }
                    paginationEmbed(message, listOfEmbed);
                }
            } else {
                const command =
                    client.commands.get(args[0].toLowerCase()) ||
                    client.commands.find(
                        (c) =>
                            c.aliases &&
                            c.aliases.includes(args[0].toLowerCase())
                    );

                if (!command) {
                    const embed = new MessageEmbed()
                        .setTitle(
                            `Invalid command! Use \`${prefix}help\` for all of my commands!`
                        )
                        .setColor("FF0000");
                    return message.channel.send(embed);
                }

                const embed = new MessageEmbed()
                    .setTitle("Command Details:")
                    .addField("PREFIX:", `\`${prefix}\``)
                    .addField(
                        "COMMAND:",
                        command.name
                            ? `\`${command.name}\``
                            : "No name for this command."
                    )
                    .addField(
                        "ALIASES:",
                        command.aliases
                            ? `\`${command.aliases.join("` `")}\``
                            : "No aliases for this command."
                    )
                    .addField(
                        "USAGE:",
                        command.usage
                            ? `\`${prefix}${command.name} ${command.usage}\``
                            : `\`${prefix} ${command.name}\``
                    )
                    .addField(
                        "DESCRIPTION:",
                        command.description
                            ? command.description
                            : "No description for this command."
                    )
                    .setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp()
                    .setColor(roleColor);
                return message.channel.send(embed);
            }
        }
    },
};
