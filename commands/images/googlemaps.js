const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: 'googlemaps',
  description:'Returns map of a location provided',


  async execute(message, args,client) {
   
   const sit = args.join("_")
  if (!args.length) return message.channel.send("Provide a valid location")
    const site = `https://maps.google.com/?q=${args.join("+")}`
    try {
      const msg = await message.channel.send('**Please wait...** This may take up to 10 seconds.')
          msg.delete({ timeout: 5000 })
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );
  let att = new Discord.MessageAttachment(body, `${sit}.png`)
      return  message.channel.send({files: [att]});
  
    } catch (err) {
      
      return message
        .reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        
    };
    }
  }