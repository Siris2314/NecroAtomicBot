const Discord = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    name : 'amogus',
    description:'Amogus command',
async execute(message,args,client) {
    const member = message.mentions.members.first() || message.member;
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    let bg = await Canvas.loadImage("https://github.com/katie07/Imagayes/blob/main/AMOGUS.png?raw=true")
     let knife = await Canvas.loadImage("https://github.com/katie07/Imagayes/blob/main/KNFIE.png?raw=true")
        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext(`2d`);
        ctx.drawImage(avatar, 440, 200, 500, 290);
        ctx.drawImage(bg, 0, 0, 1000, 1000);
        ctx.drawImage(knife, 630, 400, 300, 300);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'amogus.jpg');
    message.channel.send({files : [attachment]});
    console.log(message)
   }
}