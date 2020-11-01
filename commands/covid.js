const fetch = require('node-fetch')
const Discord = require('discord.js')


module.exports = {

  name: "covid",
  description: "Tracks Cases WorldWide",

  execute(message,args){
    let countries = args.join(" ");

    const noArgs = new Discord.MessageEmbed()
      .setTitle('Missing Arguments')
      .setColor(`00xFF0000`)
      .setDescription("Missing Arguments")

    if(!args[0]){
      return message.channel.send(noArgs);
    }
    console.log(args);
    if(args[0] === "WorldWide"){
      fetch(`https://covid19.mathdro.id/api`)
        .then(response => response.json())
        .then(data => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
          .setTitle(`WorldWide COVID-19 Cases`)
          .addField(`Confirmed Cases`, confirmed)
          .addField(`Recovered Cases`, recovered)
          .addField(`Deaths`, deaths)

          message.channel.send(embed)


        })
    } else{
      fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then(response => response.json())
        .then(data => {
          let confirmed = data.confirmed.value.toLocaleString()
          let recovered = data.recovered.value.toLocaleString()
          let deaths = data.deaths.value.toLocaleString()

          const embed = new Discord.MessageEmbed()
          .setTitle(`WorldWide COVID-19 for ***${countries}***`)
          .addField(`Confirmed Cases`, confirmed)
          .addField(`Recovered Cases`, recovered)
          .addField(`Deaths`, deaths)

          message.channel.send(embed)

    }).catch(e => {
      return message.channel.send('Invalid country provided')
    })
  }
}
}
