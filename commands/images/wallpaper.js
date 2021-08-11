const hdqwalls = require("hdqwalls-wrapper")
const Discord = require('discord.js')

module.exports = {

    name:'wallpaper',
    description:'Returns a wallpaper from HDQWalls',


    async execute(message, args,client){

        const query = args.join(" ");

        if(!query) return message.channel.send('Please provide query to search for')

        const image = await hdqwalls(query);


        const num = Math.floor((Math.random()) * 20);

        const embed = new Discord.MessageEmbed()
            .setURL(image[num])
            .setTitle('Here is your wallpaper')
            .setColor("RANDOM")
            .setImage(image[num])

            return message.channel.send({embeds:[embed]});
        


    }



}
