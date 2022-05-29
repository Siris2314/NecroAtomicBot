require("dotenv").config();
const apikey = process.env.giphy
const giphy = require("giphy-api")(apikey);
const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name: "giphy",
    description: "Search for a gif from giphy",
    options:[
        {
            name:'query',
            description:'The query to search gifs for',
            type:'STRING',
            required:true
        }
    ],

     /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

    run: async(client, interaction) => {

        const query = interaction.options.getString('query');

        try{
            giphy.search(query).then(function(response) {
                console.log(response)
                let id = response.data[0].id;
                let url = `https://media.giphy.com/media/${id}/giphy.gif`

                const embed = new MessageEmbed()
                  .setColor(client.color.midnightblue)
                  .setImage(url)
                  .setFooter(interaction.guild.name, interaction.guild.iconURL())
                  .setTimestamp()


                interaction.followUp({embeds:[embed]})

            })
        }
        catch(error){
            interaction.followUp({content:'API Error has occured'})
        }
    }
}