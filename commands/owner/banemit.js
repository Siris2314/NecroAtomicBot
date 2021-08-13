require("dotenv").config();
const ownerid = process.env.ownerid;

module.exports = {

    name:'banemit',
    description:'Simulates Ban Events(Owner Only)',

    async execute(message,args,client){
        if(message.author.id != ownerid) return;




        client.emit('guildBanAdd', message.member);

        message.channel.send({content:'Sticker Event Simulation Success'})
    }
}