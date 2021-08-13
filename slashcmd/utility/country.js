const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const { country } = require("popcat-wrapper")

module.exports = {
    name:'country',
    description: 'returns country info',
    options: [

        {

            name:'country',
            description:'Select Country',
            type:'STRING',
            required:true


        }



    ],

    run: async (client, interaction) => {
        const count = interaction.options.getString('country');
try{
        const c = await country(count)

        const embed = new MessageEmbed()
            .setTitle(c.name)
            .setColor("4169e1")
            .setThumbnail(c.flag)
            .addField("Name", c.name, true)
            .addField("Capital", c.capital, true)
            .addField("Domain", c.domain, true)
            .addField("Region", c.region, true)
            .addField("Population", c.population, true)
            .addField("Area", c.area, true)
            .addField("Currency", `${c.currency.name} (${c.currency.short})\nSymbol: ${c.currency.symbol}`)
        
        interaction.followUp({embeds:[embed]})

    } catch(err){
        interaction.followUp({content:'Something has gone wrong'});
        console.log(err);
    }   

    }
}


