const Schema = require('../schemas/warn')

module.exports = {

    name:'clearwarn',
    description:'Removes all of the users warnings',

    async execute(message,args,client){
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('Perms denied')



        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('Member not found')

        Schema.findOne({guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) return message.channel.send('Something went wrong')

            if(data){
               await Schema.findOneAndDelete({user:user.user.id, guildid: message.guild.id})
               message.channel.send(`Cleared ${user.user.tag}'s warnings`)
            } else{
                message.channel.send('Users warns cleared')
            }

        })
 }
}