const Schema = require('../../schemas/count')
module.exports = {
    name:'removecount',
    description:'Disables Counting System',

    async execute(message, args, client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Invalid Perms'})

        const channel = message.mentions.channels.first() || message.channel


        Schema.findOne({Guild:message.guild.id}, async(err, data) => {
            if( channel != data.Channel) {
           message.channel.send({content: `Theres no Counting System Set in  <#${channel.id}>`})
           }  
        if(!data) return message.channel.send({content: "Set a Counting Channel First"})
            if(data) data.delete();

          const deletedata = new Schema({
                Guild:message.guild.id,
                Channel:channel.id,
                Count:0
            })
            deletedata.delete();
       message.channel.send({content: `Counting system Disabled.`})
        })


    }
}
