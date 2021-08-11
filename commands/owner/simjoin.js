require("dotenv").config();
const ownerid = process.env.ownerid;

module.exports = {

    name:'simjoin',
    description:'Simulates a Member Joining Server(Owner Only)',

    async execute(message,args,client){
        if(message.author.id != ownerid) return;




        client.emit('guildMemberAdd', message.member);

        message.channel.send({content:'Simulated Join Success'})
    }
}