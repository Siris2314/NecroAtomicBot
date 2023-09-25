const Schema = require('../../schemas/count')
module.exports = {
    name:'count',
    description:'Check the next Count',

    async execute(message, args, client){
        if(!message.member.permissions.has('SEND_MESSAGES')) return message.channel.send({content:'Invalid Perms'})
        Schema.findOne({Guild:message.guild.id}, async(err, data) => {
            if(data) {
               return message.reply({content:`Next Count In <#${data.Channel}> is ${data.Count + 1}`})
            }
        })
    }
}
