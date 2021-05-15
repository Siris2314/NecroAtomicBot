const Schema = require('../../schemas/warn')

module.exports = {

    name:'removewarn',
    description:'Removes a users warning',

    async execute(message,args,client){
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('Perms denied')



        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('Member not found')

        Schema.findOne({guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) return message.channel.send('Something went wrong')

            if(data){
                let num = parseInt(args[1]) - 1;
                data.content.splice(num, 1)

                message.channel.send(`Warning number ${num} deleted`)

                data.save()
            } else{
                message.channel.send('User ')
            }

        })
 }
}