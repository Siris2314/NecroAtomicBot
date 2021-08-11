const Discord = require('discord.js');
const Canvas = require('canvas');
const image = './assets/heart.png'
const fs = require("fs");
module.exports = {

  name: "ship",
  description: "Relationship Calculator",

  execute: async (message,args,client) => {
        let user1 = message.mentions.users.array()[0];
        let user2 = message.mentions.users.array()[1];
        let c = Math.random() * 100 + 1;
        let chance = parseInt(c);
        const canvas = Canvas.createCanvas(700, 250);
	      const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(image); 
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	      const avatar1 = await Canvas.loadImage(user1.displayAvatarURL({format: 'jpg' }));
	      const avatar2 = await Canvas.loadImage(user2.displayAvatarURL({format: 'jpg' }));
        ctx.drawImage(avatar1, 75, 75);
        ctx.drawImage(avatar2, 500,75);
        ctx.font = "40px sans-serif";
        ctx.fillStyle = "#000000";
        ctx.fillText(`${chance}%`, 315, 130);

        const attachment = new Discord.MessageAttachment(
              canvas.toBuffer(),
              "love.png"
          );

        let embed = new Discord.MessageEmbed()
            .setTitle(`**Relationship Calculator**`)
            .setColor("#ff6050")
            .setImage("attachment://love.png")
            .setDescription(
                `${user1.username} and ${user2.username} chances of a relationship are ${chance}%`
            )
            .setFooter(new Date())
            .attachFiles(attachment);

        return message.channel.send({embeds:[embed]});

  }
}
