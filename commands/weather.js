const weather = require('weather-js')
const Discord = require('discord.js')
function colorTemperatureToRGB(farenheit) {
    var kelvin = (farenheit -32) * 5/9 + 273.15;
    var temp = kelvin / 100;

    var red, green, blue;

    if (temp <= 66) {
        red = 255;

        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;

        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);

        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);

        blue = 255;
    }

    return {
        r: clamp(red, 0, 255),
        g: clamp(green, 0, 255),
        b: clamp(blue, 0, 255),
    };
}
function clamp(x, min, max) {
    if (x < min) {
        return min;
    }
    if (x > max) {
        return max;
    }

    return x;
}

module.exports = {
  name: "weather",
  description:"Returns weather forecast",
  execute(message,args){
    weather.find({search: args.join(" "), degreeType: 'F'}, function(error,result){
        if (error) {
            return message.channel.send(error);
        }
        if (!args[0]) {
            return message.channel.send("Specify Location to get a forecast......");
        }
        if (result === undefined || result.length === 0) {
            return message.channel.send("Location not found....");
        }
        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
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
        message.channel.send(weatherinfo);
    })
  }
}
