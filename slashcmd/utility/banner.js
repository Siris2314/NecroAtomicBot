const axios = require('axios') 
const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
require('dotenv').config()
const token = process.env.token


module.exports = {
    name:'banner',
    description: 'Returns a User\'s banner',
    options: [
        {
            name:'user',
            description:'Select user who\'s you want to see',
            type:'USER',
            required:true
        },
        {
            name:'size',
            description:'Select the size of the banner(Default: 2048, Max: 4000)',
            type:'NUMBER',
            required:false,
        }


    ],

    run: async (client, interaction) => {


        let user = interaction.options.getUser('user');

        let size = interaction.options.getNumber('size');

        axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${token}`,
            },
        }).then((res) => {
            const {
                banner,
                accent_color
            } = res.data


       if(banner){
         const extension = banner.startsWith("a_") ? ".gif" : ".png";
         const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=${String(size)}`;

         const embed = new MessageEmbed()
            .setTitle(`${user.username}'s banner`)
            .setImage(url)
            .setColor(accent_color || "#2F3136");

        interaction.followUp({embeds:[embed]})
       }
       else{
            const embed = new MessageEmbed()
                .setTitle(`${user.username}'s does not have a banner, so here is their accent color`)
                .setColor(accent_color);
    
          interaction.followUp({embeds:[embed]})
       }
    })
    }
}