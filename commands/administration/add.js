const {Client, Message, MessageEmbed, Util} = require('discord.js')
const Schema = require('../../schemas/reaction-roles')


module.exports ={
    name:'add',
    description:'Adds role reactions',

    async execute(message,args, client){
        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Perms Denied'})
        const role = message.mentions.roles.first();

        let[, emoji] = args;

        if(!emoji) return message.channel.send({content:'Please specify an emoji to react to'})

        const parsedEmoji = Util.parseEmoji(emoji)

        Schema.findOne({Guild : message.guild.id}, async(err, data) => {
            if(data){
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji,
                    }
                ]

                await Schema.findOneAndUpdate({Guild: message.guild.id}, data)
            } else {
                new Schema({
                    Guild: message.guild.id,
                    message:0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji,
                            }
                        ]
                    }

                    
                }).save();
            }
            message.channel.send({content:'New Role Added'})
        })



    }

}