const click = require("discord-click-speed");
const {CommandInteraction, Client, MessageEmbed} = require("discord.js");

module.exports = {
    name: "clickspeed",
    description: "Click Speed Game",
    

    run: async (client, interaction) => {

    try{

        const game = new click();

        game.party(interaction);
    }catch(e){
        interaction.reply(`Error: ${e.message}`)
    }

    }
}