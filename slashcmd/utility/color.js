const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const axios = require('axios')
module.exports = {

    name:'color',
    description:'Returns Color Info',
    options: [

        {
            name:'color',
            description:'Enter Color to find info on(Must be in form: #FFFFF)',
            type:'STRING',
            required: true,


        }




    ],

    run: async(client, interaction) => {

    

        var color = interaction.options.getString('color');

        if(color.includes("#")){
            color = color.split("#")[1];
        }


        try{
            const data = await axios.get(`https://api.alexflipnote.dev/colour/${color}`);
    
            const info = data.data; 
    
    
            const embed = new MessageEmbed() 
                .setTitle(info.name)
                .setDescription(`RGB Values: ${info.rgb}\n\nBrightness: ${info.brightness}\n\nHex: ${info.hex}`)
                .setThumbnail(info.image)
                .setImage(info.image_gradient) 
                .setColor(info.hex)
    
            return interaction.followUp({embeds:[embed]});
    
         } catch(err){
             message.channel.send("Not a valid color")
         }

    }
}