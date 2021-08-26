const axios = require('axios')
const {MessageEmbed} = require('discord.js')
require("dotenv").config();
const key = process.env.steam


module.exports = {

    name:'steam',
    description:'Returns User Game Library Info',

    async execute(message,args,client){

        const query = args.join(' ');
        

        if(!query || args.length < 1){

            const embed = new MessageEmbed()
                .setTitle('Command Error')
                .setDescription(`❌ Please provide the user steam ID to search for`)
                .setTimestamp() 

            message.channel.send({embeds:[embed]})
        }


        const res = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${query}&format=json&include_appinfo=true`)

        const info = res.data; 


        const games = info.response.games;


        for(let i = 0; i <games.length / 2; i++){

            console.log(games[i])

        }


            

    }

}