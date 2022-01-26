const { GenshinKit } = require('@genshin-kit/core')
const App = new GenshinKit()
require('dotenv').config()
const {Client, CommandInteraction, MessageEmbed} = require("discord.js");
const cookie = process.env.genshin


module.exports = {
    name: "genshinuser",
    description: "Returns Info on Genshin User",
    options:[
        {
            name:'uid',
            description:'Genshin User ID',
            type:'STRING',
            required:true
        }

    ],

    run: async (client, interaction) => {

        const uid = interaction.options.getString('uid')
        App.loginWithCookie(cookie);
        App.setServerType('os');

        App.getUserInfo(Number(uid)).then((res) => {

            const adn = res.stats.active_day_number;
            const achnum = res.stats.achievement_number;
            const anemonum = res.stats.anemoculus_number;
            const geoculusnum = res.stats.geoculus_number;
            const charcolc = res.stats.avatar_number
            const wayp = res.stats.way_point_number;
            const spiral = res.stats.spiral_abyss;
            const pcn = res.stats.precious_chest_number
            const lcn = res.stats.luxurious_chest_number
            const ecn = res.stats.exquisite_chest_number
            const ccn = res.stats.common_chest_number

            const embed = new MessageEmbed()
                .setTitle(`Stats for UID: ${uid}`)
                .addField("Active Days of Playing", String(adn))
                .addField("Total Number of Achievements", String(achnum))
                .addField("Anemoculus Collected",String(anemonum))
                .addField("Geoculus Collected",String(geoculusnum))
                .addField("Characters Collected",String(charcolc))
                .addField("Total WayPoints Unlocked", String(wayp))
                .addField("Current Spiral Abyss Floor", String(spiral))
                .addField("Total Precious Chests Collected", String(pcn))
                .addField("Total Luxurious Chests Collected", String(lcn))
                .addField("Total Exquisite Chests Collected", String(ecn))
                .addField("Total Common Chests Collected", String(ccn))
                .setTimestamp()
                .setFooter({text:'Powered by Mihoyo'})

            interaction.followUp({embeds:[embed]})
        })

        

    }




}