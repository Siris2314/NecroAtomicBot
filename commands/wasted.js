const canva = require("canvacord");
const Discord = require("discord.js");

module.exports = {
    name: "wasted",
    description: "Make a picture wasted",

    async execute(message, args) {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });

        let image = await canva.Canvas.wasted(avatar);
        let wasted = new Discord.MessageAttachment(image, "wasted.png");

        message.channel.send(wasted);
    },
};
