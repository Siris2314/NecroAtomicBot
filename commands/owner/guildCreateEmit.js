require("dotenv").config();
const ownerid = process.env.ownerid;

module.exports = {

    name:'guildcreate',
    description:'Simulates Guild Create Events(Owner Only)',

    async execute(message,args,client){
        if(!message.author.id == ownerid) return;
        console.log(ownerid);




        client.emit('guildCreate', message.guild);

        message.channel.send({content:'Guild Create Event Simulation Success'})
    }
}