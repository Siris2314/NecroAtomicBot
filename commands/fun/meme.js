const fetch = require('node-fetch')
const Discord = require('discord.js')
module.exports = {
name: "meme",
description:'Meme command to retrieve memes',
async execute(message, args,client) {
 const res = await fetch(`http://api.popcatdev.repl.co/meme`)
 const meme = await res.json()

    client.embed(message,{
        title: meme.title,
        url:meme.url,
        color:'RANDOM',
        image: {
           url: meme.image
        },

        footer: {
            text: `👍 ${meme.upvotes} 💬 ${meme.comments}`
        }
    })

}
}