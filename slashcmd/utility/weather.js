const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const { OpenWeatherAPI } = require("openweather-api-node")
const { getJson } = require("serpapi");



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
    ],

    run: async(client, interaction) => {
        const location = interaction.options.getString('location')

        let weather = new OpenWeatherAPI({
            key: process.env.weather,
            locationName: String(location),
            units: "imperial"
        })

        const json = await getJson({
            q: String(location),
            engine: "google_images",
            ijn: "0",
            api_key: process.env.serpapi
        });


        const image = json["images_results"][0].thumbnail;


        
        weather.getCurrent().then(data => {
            
            // console.log(typeof data.dt)
            // console.log(`Current temperature in New York is: ${data.weather.temp.cur}\u00B0F`)

            const embed = new MessageEmbed()
                .setTitle(`Weather in ${location}`)
                .addFields(
                    {
                        name:'Temperature', value: String(data.weather.temp.cur)
                    },
                    {
                        name:'Feels Like', value: String(data.weather.feelsLike.cur)
                    },
                    {
                        name: 'Humidity', value: String(data.weather.humidity)
                    },
                    {
                        name: 'Wind Speed', value: String(data.weather.wind.speed)
                    },
                    {
                        name: 'Description', value: String(data.weather.description)
                    }

                )
                .setImage(String(image))
                

            interaction.followUp({embeds:[embed]})
        }).catch(err => {
            console.log(err)
            interaction.followUp({content:'Invalid Location'})
        })
    }
}