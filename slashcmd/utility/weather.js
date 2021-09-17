const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const weather = require('weather-js')
const {WeatherImage} = require('weather-builder')

module.exports = {
    name:'weather',
    description:'Returns Weather with Image',
    options:[
        {
            name:'location',
            description:'Location of weather',
            type:'STRING',
            required:true,

        },
        {
            name:'degree',
            description:'Select a Degree Type',
            type:'STRING',
            required: true,
            choices:[
                {
                    name:'Celcius',
                    value:'C'
                },
                {
                    name:'Farenheit',
                    value:'F'

                }

            ]
        },
    ],

    run: async(client, interaction) => {
        const location = interaction.options.getString('location')
        let args = interaction.options.data;
        const degree = args[0]?.value;

        weather.find({search: location, degreeType:degree}, function(error, result){

            if (error) {
                return interaction.followUp(error);
            }

            if (result === undefined || result.length === 0) {
                return interaction.followUp("Location not found....");
            }

            const current = result[0].current;
            const location = result[0].location;


            const embed = new MessageEmbed()
                .setDescription(`${current.skytext}`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .addField("Timezone", `UTC${location.timezone}`, true)
                .addField("Degree Type", "Farenheit", location.degreetype, true)
                .addField("Temperature", `${current.temperature}`, true)
                .addField("Wind", current.winddisplay, true)
                .addField("Feels like ", `${current.feelslike}`, true)
                .addField("Humidity", `${current.humidity}`, true)
                .setColor("#4db1d1");

            interaction.followUp({embeds:[embed]})







        })


    }
}