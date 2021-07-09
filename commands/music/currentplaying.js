const image = './assets/current.png'
const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name:'current',
    description:'Returns Current Track Information',

    async execute(message, args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        let queue = client.music.getQueue(message)
        if(!queue){
          const embed = new MessageEmbed()
            .setTitle(`:x: **Queue Error**`)
            .setDescription('No Queue Currently Exists')
        return message.channel.send(embed)
      }

        let queuesong = queue.formattedCurrentTime;
        let cursong = queue.songs[0];
        let cursongtimes = 0;
        let cursongtimem = 0;
        let cursongtimeh = 0;
        let queuetimes = 0;
        let queuetimem = 0;
        let queuetimeh = 0;
        if (cursong.formattedDuration.split(":").length === 3) {
            cursongtimes = cursong.formattedDuration.split(":")[2]
            cursongtimem = cursong.formattedDuration.split(":")[1]
            cursongtimeh = cursong.formattedDuration.split(":")[0]
        }
        if (queuesong.split(":").length === 3) {
            queuetimes = queuesong.split(":")[2]
            queuetimem = queuesong.split(":")[1]
            queuetimeh = queuesong.split(":")[0]
        }
        cursongtimes = cursong.formattedDuration.split(":")[1]
        cursongtimem = cursong.formattedDuration.split(":")[0]
        queuetimes = queuesong.split(":")[1]
        queuetimem = queuesong.split(":")[0]
        let maxduration = Number(cursongtimes) + Number(cursongtimem) * 60 + Number(cursongtimeh) * 60 * 60;
        let minduration = Number(queuetimes) + Number(queuetimem) * 60 + Number(queuetimeh) * 60 * 60;
        let percentduration = Math.floor((minduration / maxduration) * 100);

        let songtitle = cursong.name;
        let curtime = cursong.formattedDuration;
        let oftime = `${queue.formattedCurrentTime}/${cursong.formattedDuration}`
        const canvas = Canvas.createCanvas(800, 200);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(image);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const url = `https://img.youtube.com/vi/${cursong.id}/mqdefault.jpg`
        const avatar = await Canvas.loadImage(url);
        ctx.drawImage(avatar, 10, 10, 192, 108);
        

        var textString = songtitle.substr(0, 35);
        ctx.font = 'bold 40px Genta';
        ctx.fillStyle = '#d625ed';
        ctx.fillText(textString, 10 + 192 + 10, 10 + 25);
        let textStringt
        if (songtitle.length > 40) textStringt = songtitle.substr(35, 32) + "...";
        else textStringt = "";
        ctx.font = 'bold 40px Genta';
        ctx.fillStyle = '#d625ed';
        ctx.fillText(textStringt, 10 + 192 + 10, 10 + 25 + 40);

        ctx.font = 'bold 30px Genta';
        ctx.fillStyle = '#d625ed';
        ctx.fillText(oftime, 10 + 192 + 10, 10 + 25 + 30 + 50);

        let percent = percentduration;
        let index = Math.floor(percent) || 10;
        let left = Number(".".repeat(index).length) * 7.9;

        if (left < 50) left = 50;

        let x = 14;
        let y = 200 - 65;
        let width = left;
        let height = 50;
        let radius = 25;

        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();

        ctx.fillStyle = '#d625ed';
        ctx.fill();


        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'nowplaying.png');

        let fastembed2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(cursong.name)
            .setURL(cursong.url)
            .setImage("attachment://nowplaying.png")
            .attachFiles(attachment)
        await message.channel.send(fastembed2);
        return;
    }

  }




