const weather = require('weather-js')
const Discord = require('discord.js')


module.exports = {
  name: "Weather",
  description:"Returns weather forecast",

  async execute(message,args){

    weather.find({search: args.join(" "), degreeType: 'F'}, function(error,result){
      if(error){
        return message.channel.send(error)
      }
      if(!args[0]){
        return message.channel.send('Specify Location to get a forecast......')
      }
      if(result === undefined || result.length === 0){
        return message.channel.send('Location not found....')
      }
      var current = result[0].current;
      var location = result[0].location;

      const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`${current.skytext}`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Farenheit', true)
        .addField('Temperature', `${current.temperature}`, true)
        .addField('Wind', current.winddisplay,true)
        .addField('Feels like ', `${current.feelslike}`, true)
        .addField('Humidity', `${current.humidity}`, true)

        message.channel.send(weatherinfo)





})
}
}
