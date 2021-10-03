const Canvas = require("canvas")
const GIFEncoder = require("gif-encoder-2");

module.exports = {
    name:'avatarspin',
    description:'Returns spinning GIF of a mentioned user avatar',

    async execute(message,args,client){


    try{

        message.delete()
        const user = message.mentions.users.first() || message.author

        let avatarURL = (size, format, dynamic) => {
          return user.avatarURL({
              size: size === "Direct" ? 1024 : size,
              format,
              dynamic
            });
          };

        let image = await Canvas.loadImage(avatarURL(512, "png", false));

        const width = 512,
             height = 512,
             angles = 50;

        const canvas = Canvas.createCanvas(width, height);

        const ctx = canvas.getContext("2d")

        ctx.arc(width / 2,height/2, width/2, 0, Math.PI * 2);
        ctx.clip()

        const encoder = new GIFEncoder(width, height)
        encoder.setTransparent(0x402814);

        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(15);

        const centerX = width / 2;
        const centerY = height / 2;

        ctx.drawImage(image, 0, 0, width, height)

        for(let i = 0; i<=angles;i++){
            encoder.addFrame(ctx)
            ctx.translate(centerX, centerY)
            ctx.rotate((Math.PI * 2) / angles)
            ctx.translate(-centerX, -centerY)

            const imageData = ctx.getImageData(0,0, width, width)

            for (let j = 0; j < imageData.data.length; j += 4) {
                imageData.data[j] = 64;
                imageData.data[j + 1] = 40;
                imageData.data[j + 2] = 20;
                imageData.data[j + 3] = 0;
              }
        
              ctx.putImageData(imageData, 0, 0);
        
              ctx.drawImage(image, 0, 0, width, height);
        }

        encoder.finish()

        return message.channel.send({
            files: [
                {
                    attachment:encoder.out.getData(),
                    name:"spin-avatar.gif"
                }
            ]
        });

    } catch(err){
        message.channel.send('Connection Error')
    }



        
    }
}