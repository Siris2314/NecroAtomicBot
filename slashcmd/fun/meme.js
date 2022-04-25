const axios = require("axios")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "meme",
    description:"meme command",

    run:async(client, interaction) => {
        
      axios
           .get("https://memes.blademaker.tv/api?lang=en")
           .then(async function(response) {
               const { data } = response
               
               const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle(data.title)
                .setImage(data.image)

               interaction.followUp({ embeds: [embed] })
           }
        )
    }
}