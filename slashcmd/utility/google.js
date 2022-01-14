require('dotenv').config()
const google = process.env.google
const googleid = process.env.googleid
const superagent = require('superagent')
const { CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'google',
    description:'Searches Google',
    options: [
        {
            name:'query',
            description:'The query to search for',
            type:'STRING',
            required:true
        }
    ],

        /**
     * 
     * 
     * 
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * 
     * 
     */
    run:async (client, interaction) => {
        const query = interaction.options.getString('query');


        let res = await superagent.get("https://customsearch.googleapis.com/customsearch/v1")
            .query({q: query, cx:googleid, key: google})

        if(!res.body.items) return interaction.followUp({content:"No results found"})

        if(res.status >= 400) return interaction.followUp({content:"Request 400 Error"}).then(console.log(result.message))

        let result = res.body.items[0];

        console.log(result)
        const embed = new MessageEmbed()
            .setColor(client.color.invis)
            .setTitle(String(result.title))
            .setDescription(result.snippet)
            .setURL(result.link)
            .setImage(result.pagemap.cse_image[0].src || result.pagemap.cse_thumbnail[0].src)
            .setFooter(`Powered by Google`)

        interaction.followUp({embeds: [embed]})
        

    }
}