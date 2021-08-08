const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config()
const token = process.env.riot
const championName = require('./lolchamp.js');


module.exports = {

    name:'champrotate',
    description:"Shows Current Free Champion Rotation(LoL)", 
    
    async execute(message, args,client) {


        const info  = axios.get(`https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${token}`)
            .then(response => {

                console.log(response);
                var myChampions = [];
                var championId = "";
                var dataToPush = "";
        
        
                for(var i = 0; i<14; i++){
                    championId = championName.getChampionName(response.data.freeChampionIds[i])
                    dataToPush = championId;
                    myChampions.push(`${i+1}) ${dataToPush}`);
                }
                
                var embed = new Discord.MessageEmbed()
                .addField("Free champion rotation: ", `\`\`\`${myChampions.join('\n')}\`\`\``, true)
                .addField("Powered by: ", `[developer.riotgames.com](https://developer.riotgames.com/)`)
                .setTimestamp()
                .setColor("0x#FF0000")
                message.channel.send(embed);
        


            })

       


    }




}