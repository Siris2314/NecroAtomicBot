const canva = require("canvacord");
const Discord = require("discord.js");

module.exports = {
    name: "slap",
    description: "Make a picture slapped",

    async execute(message, args,client) {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });
        let avatar1 = message.mentions.members.first()
        avatar1pic = avatar1.user.displayAvatarURL({ format: 'png' })
        let image = await canva.Canvas.slap(avatar, avatar1pic);
        let slap = new Discord.MessageAttachment(image, "slap.png");

        message.channel.send({files: [slap]});
    },
};
