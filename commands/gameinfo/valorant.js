const val = require('valorant-api-com')
const Discord = require('discord.js')
const agents = require('../gameinfo/agents.json')
const weapons = require('../gameinfo/weapons.json')

module.exports = {
    name:'valorant',
    description:'Valorant Interface',

    async execute(message,args,client){

        let config = {
            'language':'en-US'
        }
        const valclient = new val(config)


    let option = args[0];

    if(!option){
        const embed = new Discord.MessageEmbed()
              .setTitle('Welcome To Necro Valorant')
              .setDescription('The One Place For All Your Valorant Information')
              .addField("**Accessible: **", `\`Look Up Information Right As You Game \``, false)
              .addField("**Features: **", `\`Search Information on Agents, Weapons, Maps, and Skins\``, false)
              .addField("**Usage: **", `\`<prefix> valorant weapons/agents (name of weapon/agent)\``, false)
              .setColor("RED")
              .setImage("https://daily.upcomer.com/wp-content/uploads/2020/12/Valorant-Header-Image.jpg")
        return message.channel.send(embed)

    }
    

     if(option.toLowerCase() == "agent"){ 

        let agent = args.slice(1).join(" ");

        agent = agents[agent]

        const allAgents = await valclient.getAgents(agent)


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

    
        
        return message.channel.send(embed)
        }
    else if(option.toLowerCase() == "weapons"){
            let weapon = args.slice(1).join(" ");

            weapon = weapons[weapon];

        const allWeapons = await valclient.getWeapons(weapon);
        const embed = new Discord.MessageEmbed()
           .setTitle(`${allWeapons.data.displayName}`)
           .addField(`Category: `,`${allWeapons.data.category}`,true)
           .addField('Fire Rate(Bullets Per Second): ',`${allWeapons.data.weaponStats.fireRate}` , false)
           .addField('Magazine Size: ',`${allWeapons.data.weaponStats.magazineSize}` , false)
           .addField('Run Speed Multiplier: ', `${allWeapons.data.weaponStats.runSpeedMultiplier}`,false)
           .addField('Equip Time(Seconds): ', `${allWeapons.data.weaponStats.equipTimeSeconds}`,false)
           .addField('Reload Time(Seconds): ', `${allWeapons.data.weaponStats.reloadTimeSeconds}`,false)
           .addField('First Bullet Accuracy: ', `${allWeapons.data.weaponStats.firstBulletAccuracy}`,false)
           .addField('Zoom Multiplier: ', `${allWeapons.data.weaponStats.adsStats.zoomMultiplier}`,false)
           .addField('Fire Rate(ADS): ', `${allWeapons.data.weaponStats.adsStats.fireRate}`,false)
           .setThumbnail(allWeapons.data.displayIcon)

        return message.channel.send(embed);








        }

    }
}