const Discord = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    name : 'simp',
    description:'Returns Simp Avatar Picture',
 async execute(message, args,client){
    const member = message.mentions.members.first() || message.member;
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    let bg = await Canvas.loadImage('https://media.discordapp.net/attachments/839828075624923199/855655030191292416/2bb57a4642b8381d8ec313e31a464bdb.png?width=670&height=670');
    
        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext(`2d`);
       
        ctx.drawImage(avatar, 0, 0, 1000, 1000);
       ctx.drawImage(bg, 0, 0, 1000, 1000);
        
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ARCHIE.jpg');
      message.channel.send({files: [attachment]});
   }
} 