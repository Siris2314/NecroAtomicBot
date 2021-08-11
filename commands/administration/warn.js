const Schema = require('../../schemas/warn')
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'warn', 
    description:'warns users',
    async execute(message, args, client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Perms denied'})

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(' ');
        if(!user) return message.channel.send({content:'Member not found'})

        Schema.findOne({guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) return message.channel.send({content:'Something went wrong'});

            if(!data){
                data = new Schema({
                    guildid: message.guild.id,
                    user: user.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason: reason

                        }
                    ]
                })
            } else{
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(obj)
            }
            data.save();
        });
        user.send(new MessageEmbed()
            .setDescription(`You have been warned for ${reason}`)
            .setColor('RANDOM')
        
        
        )


        message.channel.send(new MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`).setColor('RANDOM')
        
        )




    }
}