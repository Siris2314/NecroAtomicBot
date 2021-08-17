const {Client, CommandInteraction, ContextMenuInteraction} = require('discord.js')
const translate = require('@iamtraction/google-translate');

module.exports = {

    name:"translate",
    type:"MESSAGE",

    /**
     * 
     * 
     * 
     * 
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * 
     * 
     */



    run: async (client, interaction) => {
        const msg = await interaction.channel.messages.fetch(interaction.targetId);

        const translated = await translate(msg, {to: 'en'})

        interaction.followUp({content:`${translated.text}`})




    }





}