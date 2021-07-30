const hdqwalls = require("hdqwalls-wrapper")
const Discord = require('discord.js')

module.exports = {

    name:'wallpaper',
    description:'Returns a wallpaper from HDQWalls',


    async execute(message, args,client){

        const query = args.join(" ");

        if(!query) return message.channel.send('Please provide query to search for')

        const image = await hdqwalls(query);


        const embed = new Discord.MessageEmbed()
            .setTitle('Here is your wallpaper')
            .setColor("RANDOM")
            .setImage(image[0])

        message.channel.send(embed)
        


    }



}
