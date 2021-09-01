const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const { Color, isColor } = require("coloras");
module.exports = {

    name:'color',
    description:'Returns Color Info',
    options: [

        {
            name:'color',
            description:'Enter Color to find info on(Must be in form: rgb(37, 150, 190))',
            type:'STRING',
            required: true,


        }




    ],

    run: async(client, interaction) => {

        const color = interaction.options.getString('color');


        const colorer = new Color(color);


        const embed = new MessageEmbed()
            .setColor(colorer.toHex())
            .addFields([
                { name: "HEX", value: colorer.toHex(), inline: true },
                { name: "RGB", value: colorer.toRgb(), inline: true },
                { name: "HSL", value: colorer.toHsl(), inline: true },
                { name: "HSV", value: colorer.toHsv(), inline: true },
                { name: "CMYK", value: colorer.toCmyk(), inline: true },
                { name: "ㅤ", value: `[Image Url](${colorer.imageUrl})`, inline: true }
            ])
            .setImage(colorer.imageUrl);


        interaction.followUp({embeds:[embed]})








    }

}