const canva = require("canvacord");
const Discord = require("discord.js");

module.exports = {
    name: "spank",
    description: "Make a picture spanked",

    async execute(message, args) {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });
        let avatar1 = message.mentions.users.array()[0];
        avatar1pic = avatar1.displayAvatarURL({ format: "png" });
        let image = await canva.Canvas.spank(avatar, avatar1pic);
        let spank = new Discord.MessageAttachment(image, "spank.png");

        message.channel.send(spank);
    },
};
