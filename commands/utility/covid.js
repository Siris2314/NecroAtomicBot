const fetch = require('node-fetch');
const {CanvasRenderService} = require('chartjs-node-canvas')

const Discord = require('discord.js');

const width = 800;
const height = 600;

const chartCallback = (ChartJS) => {

}

module.exports = {
    name : 'covid',
    description : 'Returns Covid Stats',


     async execute(message, args,client){
		
		 let countries = args.join(" ");

      
        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('You are missing some args (ex: ;covid all || ;covid Canada)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
           fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then (async(data) => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)

                const canvas = new CanvasRenderService(width, height, chartCallback)

                const configuration = {
                    type:'line',
                    data: {
                        confirmed,
                        datasets:[
                            {
                                label:'Deaths',
                                data:deaths,
                                color: '#7289d9',
                                backgroundColor:'#7289d9',
                                borderColor:'#7289d9',
                                fill:false
                            }
    
                        ]
    
                    }
                }
                const image = await canvas.renderToBuffer(configuration)
    
                const attachment = new Discord.MessageAttachment(image)
    
                message.channel.send(attachment)
            })

           
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 Stats for **${countries}**`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('Invalid country provided')
            })
        }

    }
}

