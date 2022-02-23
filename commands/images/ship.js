const Discord = require('discord.js');
const Canvas = require('canvas');
const image = './assets/heart.png'
const fs = require("fs");
module.exports = {

  name: "ship",
  description: "Relationship Calculator",

  async execute(message,args,client) {
        let user1 = ' '
        let user2 = ' '
        let count = 0
        message.mentions.users.forEach((user) =>{
          count++; //Adding one onto the count variable
          if (count >= 3) return message.channel.send('Can only ship 2 people at a time!'); 
          if (count === 1) user1 = message.guild.members.cache.get(user.id); //Getting the first mentioned user
          else user2 = message.guild.members.cache.get(user.id);
        })
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
                `${user1.user.username} and ${user2.user.username} chances of a relationship are ${chance}%`
            )
            .setTimestamp()

        return message.channel.send({embeds:[embed], files:[attachment]});

  }
}
