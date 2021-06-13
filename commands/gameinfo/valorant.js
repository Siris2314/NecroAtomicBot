const val = require('valorant-api-com')
const Discord = require('discord.js')
const uuid = require('../gameinfo/uuid.json')

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

        const allWeapons = await valclient.getWeapons();

        const embed = new Discord.MessageEmbed()
           .setTitle(allAgents.data.displayName)
           .addField(`Description: `,`${allAgents.data.description}`,true)
           .addField(`Role:`,`${allAgents.data.role.displayName}`,false)
           .addField('Role Description: ',`${allAgents.data.role.description}`,false)
           .addField('Developer Name: ', `${allAgents.data.developerName}`,false)
           .addField("Ability 1: ", `${allAgents.data.abilities[0].displayName} - ${allAgents.data.abilities[0].description}`, false)
           .addField("Ability 2: ",`${allAgents.data.abilities[1].displayName} - ${allAgents.data.abilities[1].description}`, false)
           .addField("Grenade: ",`${allAgents.data.abilities[2].displayName} - ${allAgents.data.abilities[2].description}`, false)
           .addField("Ultimate: ",`${allAgents.data.abilities[3].displayName} - ${allAgents.data.abilities[3].description}`, false)
           .setThumbnail(allAgents.data.displayIcon)

        console.log(allWeapons);
        
        return message.channel.send(embed)
    }
}