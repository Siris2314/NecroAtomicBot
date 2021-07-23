const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')

module.exports = {
  name: "amogus",
  description: "Amogus Image Command",
 async execute(message, args, client) {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

    const avatar = await loadImage(
      user.displayAvatarURL({ format: "png" })
    );
    const canvas = createCanvas(867, 892);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(
      "https://cdn.discordapp.com/attachments/802613142751805471/829448447303221327/amogus_rap_editado.png"
    );
    ctx.drawImage(avatar, 270, 100, 270, 250);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      'Amogus'
    );
    message.channel.send(attachment);

  }
}