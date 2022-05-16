const axios = require('axios');
const Discord = require('discord.js');
require('dotenv').config();
const api  = process.env.serpapi

module.exports = {

    name:'wallpaper',
    description:'Returns a wallpaper from HDQWalls',


    async execute(message, args,client){

    try{

        const query = args.join(" ");

        if(!query) return message.channel.send('Please provide query to search for')

        axios.get(`https://serpapi.com/search.json?engine=google&q=${query + ' wallpaper' + ' high resolution'}&tbm=isch&ijn=0&api_key=${api}`)
        .then(res => {
            const num = Math.floor((Math.random()) * 20);

            const rand = res.data.images_results[num].original;

            const embed = new Discord.MessageEmbed()
            .setTitle(`Here is your wallpaper`)
            .setImage(rand)
            .setColor('#000488')
            .setTimestamp()

            message.channel.send({embeds:[embed]})
        })
    


    }catch(err){
        console.log(err)
    }


    }

}
