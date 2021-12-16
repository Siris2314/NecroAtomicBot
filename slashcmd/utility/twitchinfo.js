const axios = require('axios')
const Discord = require('discord.js')

module.exports = {
    name:'twitchinfo',
    description: 'Gets information about a Twitch streamer',
    options:[
        {
            name:'streamer',
            description:'The name of the streamer',
            type:'STRING',
            required:true
        }
    ],

    run: async(client, interaction) => {

        const streamer = interaction.options.getString('streamer');
        console.log(streamer);

        try{    

            const { data: info } = await axios.get(`https://luminabot.xyz/api/json/twitch-info?username=${streamer}`);

            console.log(info);

            const embed = new Discord.MessageEmbed()
                .setTitle(`${info.displayname}'s Twitch Info`)
                .addField('Total Follower Count', info.followers)
                .addField('Total Views Count'. info.view)
                .addField('Created At', info.created_on)
                .addField('Currently Live', info.currently_live)
                .addField('Last Played Game', info.stream.lastest_game)
                .addField('Last Date Live', info.last_live)
                .setThumbnail(info.thumbnail)
            interaction.followUp({embeds:[embed]})


        }
        catch(e){
            console.log(e);
            interaction.followUp({content:'Streamer channel does not exist or API is down currently'})
        }

    }

}