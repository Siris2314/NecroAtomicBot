const Schema = require('../../schemas/count')
module.exports = {
    name:'resetcount',
    description:'Resets the counting.',
    async execute(message, args, client){
    if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Invalid Perms'})

    const channel = message.mentions.channels.first() || message.channel
   

        Schema.findOne({Guild:message.guild.id}, async(err, data) => {
            if( channel != data.Channel) {
               message.channel.send({content: `There\'s no Counting System Set in  <#${channel.id}>`})
           }  
        if(!data) return message.channel.send({content: "Set a Counting Channel First"})
        if(data) {    data.Count = 0; //Reset Game to 0
                     data.UserID = null; //Reset User ID in Database
        await data.save();
           message.channel.send({content: `Counting System Resetted.`})
        }
        });
    }
}
