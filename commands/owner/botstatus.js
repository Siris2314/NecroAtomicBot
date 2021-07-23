require("dotenv").config();
const ownerID = process.env.ownerid; 

module.exports = {
    name:'botstatus',
    description:'Change Bot Status(Owner Only)',

    async execute(message, args,client){

        if(!message.author.id == ownerID) return message.channel.send(":x: Owner Only Command");

        const text = args.join(" ");

        if(!text) return message.channel.send('Please provide the status')

        client.user.setActivity(text);

        message.channel.send(`Bot Status has been set to ${text}`); 

    }



}