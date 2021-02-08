const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const canvas = process.env.canvas;

module.exports = {
    name: "comms",
    description: "returns due dates for intro to comms",

    async execute(message, args) {
        console.log("comms");

        fetch("https://rutgers.instructure.com/api/v1/courses/107517/assignments", {
            method: "GET",
            headers: {
                Authorization:
                    "Bearer 6948~wH4Yt4g1DWAogY5mMJOYVdXpqrZx3zHNJ9NsfySIrdOpMoqwL8pfCYf6ZUq1PhH1",
                "Content-Type": "application/json",
            },
        }).then((s) => {
            s.json().then((res) => {
                href = res[0];

                const embed = new Discord.MessageEmbed()
                    .setTitle(href.id)
                    .setFooter("Powered by Canvas");
                return message.channel.send(embed);
            });
        });
    },
};
