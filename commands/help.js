const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
require("dotenv").config();
const token = process.env.token;
const prefix = process.env.prefix;
const paginationEmbed = require("discord.js-pagination");

module.exports = {
    name: "help",
    description: "Shows all available bot commands.",
    async execute(message, args, client) {
        const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;

        if (!args[0]) {
            let categories = [];
            console.log(readdirSync("./commands/"));
            var counter = 0;
            var temp = [];
            readdirSync("./commands/").forEach((dir) => {
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
            var listOfEmbed = [];
            for (var i = 0; i < categories.length; i++) {
                listOfEmbed.push(
                    new MessageEmbed()
                        .setTitle("📬 Need help? Here are all of my commands:")
                        .addFields(categories[i])
                        .setDescription(
                            `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
                        )
                        .setFooter(
                            `Requested by ${message.author.tag}`,
                            message.author.displayAvatarURL({ dynamic: true })
                        )
                        .setTimestamp()
                        .setColor(roleColor)
                );
            }
            paginationEmbed(message, listOfEmbed);
            // return message.channel.send();
        } else {
            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                    .setColor("FF0000");
                return message.channel.send(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField("PREFIX:", `\`${prefix}\``)
                .addField(
                    "COMMAND:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
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
                        : `\`${prefix}${command.name}\``
                )
                .addField(
                    "DESCRIPTION:",
                    command.description ? command.description : "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                .setColor(roleColor);
            return message.channel.send(embed);
        }
    },
};
