const val = require('valorant-api-com')
const Discord = require('discord.js')
const uuid = require('./uuid.json')

module.exports = {
    name:'valorant',
    description:'Valorant Interface',

    async execute(message,args,client){

        let config = {
            'language':'en-US'
        }

        let agent = args.join(" ");

        agent = uuid[agent]

        const valclient = new val(config)

        const allAgents = await valclient.getAgents(agent)

        const embed = new Discord.MessageEmbed()
           .setTitle(allAgents.data.displayName)
           
        message.channel.send(embed)
    }
}