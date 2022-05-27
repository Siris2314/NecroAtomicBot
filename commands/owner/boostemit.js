require("dotenv").config();
const ownerid = process.env.ownerid;

module.exports = {

    name:'boostemit',
    description:'Simulates Boost Events(Owner Only)',

    async execute(message,args,client){
        if(!message.author.id == ownerid) return;

        client.emit('guildMemberUpdate', message.member, message.member);

        message.channel.send({content:'Boost Update Simulation Success'})
    }
}