const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name:"color",
    description:'Shows Details on a Color',


    async execute(message, args,client) {


     

        let color = args[0]
        if(color.includes("#")){
            color = args[0].split("#")[1];
        }

     try{
        const data = await axios.get(`https://api.alexflipnote.dev/colour/${color}`);

        const info = data.data; 


        const embed = new Discord.MessageEmbed() 
            .setTitle(info.name)
            .setDescription(`RGB Values: ${info.rgb}\n\nBrightness: ${info.brightness}\n\nHex: ${info.hex}`)
            .setThumbnail(info.image)
            .setImage(info.image_gradient) 
            .setColor(info.hex)

        message.channel.send(embed)

     } catch(err){
         message.channel.send("Not a valid color")
     }

    }



}