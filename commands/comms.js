const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const canvas = process.env.canvas;

module.exports = {
    name: "comms",
    description: "returns due dates for intro to comms",

    async execute(message, args) {
        console.log("comms");

        fetch("https://rutgers.instructure.com/api/v1/courses/107517/assignments?bucket=upcoming", {
            method: "GET",
            headers: {
                Authorization:
                    "Bearer 6948~wH4Yt4g1DWAogY5mMJOYVdXpqrZx3zHNJ9NsfySIrdOpMoqwL8pfCYf6ZUq1PhH1",
                "Content-Type": "application/json",
            },
        }).then((s) => {
            s.json().then((res) => {
                for (let i = 0; i < res.length; i++) {
                    const d = new Date(res[i].due_at);
                    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
                    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
                    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

                    message.channel.send(res[i].name + " due by " + `${mo}-${da}-${ye}`);
                }
            });
        });
    },
};
