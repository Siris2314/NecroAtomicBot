const axios = require('axios')
const Discord = require('discord.js')

module.exports = {

    name:'twinfo',
    description:'Returns twitch stats and information about a streamer',


    async execute(message, args, client) {

        const user = args.join(" ");

        if(!user) message.channel.send("Please provide a twitch user");
        
        try{

            const data = await axios.get(`https://luminabot.xyz/api/json/twitch-info?username=${user}`)
           
            const info = data.data;
            const embed = new Discord.MessageEmbed()
                .setTitle(`Twitch Stats for **${info.displayname}**`)
                .addField('Description: ',`${info.description}`, true)
                .addField('Latest Game/Content Streamed', `${info.stream.latest_game}`, false)
                .addField('Total Number of Followers ', `${info.followers}`, false)
                .addField('Total Stream Views', `${info.views}`, false)
                .addField('Streamer Type', `${info.broadcaster_type}`, false)
                .addField('Account Created At', `${info.created_on}`, false)
                .addField('Currently Live', `${info.currently_live}`, false)
                .addField('Last Stream Date', `${info.last_live}`, false)
                .setImage(info.thumbnail)
                .setURL(info.twitch_profile)


            return message.channel.send(embed);

                

            

        } catch(err){
            console.log(err);
            return message.channel.send('Twitch Profile Does not exist');
        }
    }


}