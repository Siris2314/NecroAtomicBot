const Levels = require('discord-xp')
const Canvas = require('canvas')
Discord = require(`discord.js`)
const { registerFont } = require('canvas')
registerFont('./assets/Poppins-Regular.ttf', { family: 'Poppins-Regular' })
registerFont('./assets/Poppins-SemiBold.ttf', { family: 'Poppins-Bold' })

module.exports = {
    name:'level',
    description:'Returns levels of a user',

    async execute(message,args,client){

        const badges = [1, 8];
        for (let i = badges[0]; i <= badges[1]; i++) client[`badge${i}`] = null;
        setBadge = function (variable, value) {
            if (Number(variable) > 0 && Number(variable) < 10) {
                if (Number(variable) === 1) client.badge1 = value;
                if (Number(variable) === 2) client.badge2 = value;
                if (Number(variable) === 3) client.badge3 = value;
                if (Number(variable) === 4) client.badge4 = value;
                if (Number(variable) === 5) client.badge5 = value;
                if (Number(variable) === 6) client.badge6 = value;
                if (Number(variable) === 7) client.badge7 = value;
                if (Number(variable) === 8) client.badge8 = value;
                if (Number(variable) === 9) client.badge9 = value;
                return client;
            }
        }

        const member = message.mentions.members.first() || message.member;
        const canvas = Canvas.createCanvas(1080, 400),
        ctx = canvas.getContext('2d')
       

        const user = await Levels.fetch(member.id, message.guild.id)

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        let BackgroundRadius = '50', 
        BackGroundImg = 'https://images7.alphacoders.com/109/1092420.jpg',
        AttachmentName = 'rank.png',
        Username = member.user.username,
        DrawLayerColor = '#000000',
        DrawLayerOpacity = '0.4',
        BoxColor = '#6eaedb', 
        LevelBarFill = '#FF0000', //
        LevelBarBackground = '#ffffff',
        Rank = user.level,
        TextEXP = user.xp,
        TextReputation = `#${member.user.discriminator}`,
        BarRadius = '15',
        TextXpNeded = "{current}/{needed}",
        CurrentXP = user.xp,
        NeededXP = neededXp

        ctx.beginPath();
        ctx.moveTo(0 + Number(BackgroundRadius), 0);
        ctx.lineTo(0 + 1080 - Number(BackgroundRadius), 0);
        ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(BackgroundRadius));
        ctx.lineTo(0 + 1080, 0 + 400 - Number(BackgroundRadius));
        ctx.quadraticCurveTo(
            0 + 1080,
            0 + 400,
            0 + 1080 - Number(BackgroundRadius),
            0 + 400
        );

        ctx.lineTo(0 + Number(BackgroundRadius), 0 + 400);
        ctx.quadraticCurveTo(0, 0 + 400, 0, 0 + 400 - Number(BackgroundRadius));
        ctx.lineTo(0, 0 + Number(BackgroundRadius));
        ctx.quadraticCurveTo(0, 0, 0 + Number(BackgroundRadius), 0);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1080, 400);
        let background = await Canvas.loadImage(BackGroundImg);
        ctx.drawImage(background, 0, 0, 1080, 400);
        ctx.restore();

        ctx.fillStyle = DrawLayerColor;
        ctx.globalAlpha = DrawLayerOpacity;
        ctx.fillRect(40, 0, 240, canvas.height);
        ctx.globalAlpha = 1;

        function RoundedBox(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        }

        let avatar = await Canvas.loadImage(member.user.displayAvatarURL({ dynamic: true, format: 'png' }));
        ctx.save();
        RoundedBox(ctx, 40 + 30, 30, 180, 180, 30);
        ctx.strokeStyle = '#BFC85A22'
        ctx.stroke()
        ctx.clip();
        ctx.drawImage(avatar, 40 + 30, 30, 180, 180);
        ctx.restore();


        ctx.save();
        RoundedBox(ctx, 40 + 30, 30 + 180 + 30, 180, 50, 10)
        ctx.strokeStyle = '#BFC85A22'
        ctx.stroke();
        ctx.clip();
        ctx.fillStyle = BoxColor;
        ctx.globalAlpha = "1";
        ctx.fillRect(40 + 30, 30 + 180 + 30, 180, 50, 50);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.font = '32px "Poppins-Bold"'
        ctx.textAlign = "center";
        ctx.fillText(TextReputation, 40 + 30 + 180 / 2, 30 + 180 + 30 + 38);
        ctx.restore()


        ctx.save();
        RoundedBox(ctx, 40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50, 10)
        ctx.strokeStyle = '#BFC85A22'
        ctx.stroke();
        ctx.clip();
        ctx.fillStyle = BoxColor;
        ctx.globalAlpha = "1";
        ctx.fillRect(40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.font = '32px "Poppins-Bold"'
        ctx.textAlign = "center";
        ctx.fillText(TextEXP, 40 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38);
        ctx.restore()

        ctx.save()
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.font = '39px "Poppins-Bold"'
        ctx.fillText(Username, 390, 80);
        ctx.restore()

        ctx.save()
        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.font = '55px "Poppins-Bold"'
        ctx.fillText("LEVEL: " + Rank, canvas.width - 50 - 5, 80);
        ctx.restore()

        ctx.save()
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.font = '30px "Poppins-Bold"'
        ctx.fillText("Diamond Nature", 390, 120);
        ctx.restore()

        ctx.save();
        RoundedBox(ctx, 390, 305, 660, 70, Number(15))
        ctx.strokeStyle = '#BFC85A22'
        ctx.stroke();
        ctx.clip();
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = "0.2";
        ctx.fillRect(390, 305, 660, 70);
        ctx.restore()
        const badgeNames = [
            '1', '2', '3',
            '4', '5', '6',
            '7', '8'
        ];
        for (let index = 0; index < badgeNames.length; index++) {
            let badge = `badge${index + 1}`
            if (!client[badge]) {
                ctx.fillStyle = "#ffffff";
                ctx.globalAlpha = "0.2";
                ctx.textAlign = "center";
                ctx.font = '90px "Poppins-Bold"'
                ctx.fillText(".", 75 * index + 450, 345);
            } else {
                ctx.globalAlpha = 1;
                let badgeImg = await Canvas.loadImage(
                    ['bronze', 'silver', 'gold', 'diamond'].includes(client[badge].toLowerCase()) ?
                        `${__dirname}/${badgeNames[index]}_${client[badge].toLowerCase()}.png` :
                        client[badge]
                );
                ctx.drawImage(badgeImg, 75 * index + 420, 315, 50, 50);
            }
        }

        ctx.save();
        RoundedBox(ctx, 390, 145, 660, 50, Number(BarRadius))
        ctx.strokeStyle = '#BFC85A22'
        ctx.stroke();
        ctx.clip();
        ctx.fillStyle = LevelBarBackground;
        ctx.globalAlpha = "0.2";
        ctx.fillRect(390, 145, 660, 50, 50);
        ctx.restore()


        const percent = (100 * CurrentXP) / NeededXP;
        const progress = (percent * 660) / 100;

        const latestXP = Number(CurrentXP) - Number(NeededXP);
        ctx.save();
        RoundedBox(ctx, 390, 145, progress, 50, Number(BarRadius))
        ctx.strokeStyle = '#BFC85A22'
        ctx.stroke();
        ctx.clip();
        ctx.fillStyle = LevelBarFill;
        ctx.globalAlpha = "0.5";
        ctx.fillRect(390, 145, progress, 50, 50);
        ctx.restore()

        const textXPEdited = TextXpNeded
            .replace(/{needed}/g, NeededXP)
            .replace(/{current}/g, CurrentXP)
            .replace(/{latest}/g, latestXP);
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1;
        ctx.font = '30px "Poppins-Bold"'
        ctx.fillText(
            textXPEdited,
            730,
            180
        );


        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), AttachmentName);

        message.channel.send({files: [attachment]});






    

}
}