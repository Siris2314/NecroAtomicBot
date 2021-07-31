const fetch = require('reddit-fetcher.js')
const Discord = require('discord.js')
module.exports = {
name: "meme",
description:'Meme command to retrieve memes',
async execute(message, args,client) {


    const data = await fetch("memes")

    const embed = new Discord.MessageEmbed()
        .setTitle(data.title || "No Title For This Post")
        .setImage(data.image)
        .setURL(data.url)
        .addField("Upvotes", `${data.upVotes}`)
        .setColor("RANDOM");


    message.channel.send(embed);


    

    

}
}