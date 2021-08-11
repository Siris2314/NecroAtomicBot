const Schema = require('../../schemas/warn')

module.exports = {

    name:'clearwarn',
    description:'Removes all of the users warnings',

    async execute(message,args,client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Perms denied'})



        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send({content:'Member not found'})

        Schema.findOne({guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) return message.channel.send({content:'Something went wrong'})

            if(data){
               await Schema.findOneAndDelete({user:user.user.id, guildid: message.guild.id})
               message.channel.send({content:`Cleared ${user.user.tag}'s warnings`})
            } else{
                message.channel.send({content:'Users warns cleared'})
            }

        })
 }
}