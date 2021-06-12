const axios = require('axios');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'Shows memes',
    async execute(message, args,client){
        let data = await axios
            .get(`https://api.hypsterisgod.repl.co/meme`)
            .then((res) =>
                message.channel.send(
                    new MessageEmbed()
                        .setTitle(res.data.response.title)
                        .setImage(res.data.response.url)
                        .setURL(res.data.response.url)
                        .setColor(`RANDOM`)
                )
            );
    },
};