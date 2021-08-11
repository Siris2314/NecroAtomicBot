require("dotenv").config();
const ownerid = process.env.ownerid;

module.exports = {

    name:'stickersim',
    description:'Simulates a Sticker Being Created(Owner Only)',

    async execute(message,args,client){
        if(message.author.id != ownerid) return;




        client.emit('stickerCreate', 'https://www.pngitem.com/pimgs/m/107-1078075_transparent-happy-pepe-png-discord-stickers-pepe-png.png', message.guild.id);

        message.channel.send({content:'Sticker Event Simulation Success'})
    }
}