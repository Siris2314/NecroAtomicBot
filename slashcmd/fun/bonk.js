const anime = require('anime-actions');
const {Client, CommandInteraction, MessageEmbed} = require("discord.js");

module.exports = {
    name: "bonk",
    description: "Bonk another user",
    options:[
        {
        name:'user',
        description:'User to bonk',
        type:'USER',
        required:true
        }
    ],


    run: async (client, interaction) => {
        
        const user = interaction.options.getUser('user')

        let data = await anime.bonk();

        let embed = new MessageEmbed()
        .setImage(data)
        .setColor("#2F3136")
        .setTitle(`${interaction.user.username} bonks ${user.username}`)
        .setTimestamp()


        interaction.followUp({embeds:[embed]});

    }
}