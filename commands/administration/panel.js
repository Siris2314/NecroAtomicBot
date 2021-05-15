const {Client, Message, MessageEmbed, Util} = require('discord.js')
const Schema = require('../../schemas/reaction-roles')

module.exports = {
    name:'panel',
    description: 'provides panel for role reaction',

    async execute(message,args, client){
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('Perms Denied')
    

    const channel = message.mentions.channels.first() || message.channel

    Schema.findOne({Guild:message.guild.id}, async(err, data) => {
        if(!data) return message.channel.send('No data in here')
        const mapped = Object.keys(data.Roles)
            .map((value, index) => {
                const role = message.guild.roles.cache.get(data.Roles[value][0]);
                return `${index + 1}) ${data.Roles[value][1].raw} - ${role}`
            }).join("\n\n")

        channel.send(new MessageEmbed().setDescription(mapped)).then((msg) => {
            data.Message = msg.id;
            data.save()

            const reactions = Object.values(data.Roles).map((val) => val[1].id);

            reactions.map((emoji) => msg.react(emoji))

        })

    })
    }



}