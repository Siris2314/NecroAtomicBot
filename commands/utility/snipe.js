const Discord = require('discord.js')

module.exports = {
  name:'snipe',
  description: 'snipes messages',

async execute(message,args,client){
  function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

var i = 0;
var desc = "";

const embed = new Discord.MessageEmbed()
.setColor('#ff1100')

client.snipes.reverse().forEach(msg => {
    if (msg.channel.id != message.channel.id) return;
    if (i >= 5) return;
    var endDate = new Date()
    var time = (endDate.getTime() - msg.date.getTime()) / 1000;
    console.log(msg.content);
    if(msg.image){
      image = msg.image;
    }
    else{
    desc = desc + `\n\n **Author: ${msg.author}** *(Deleted ${secondsToDhms(time)} ago)*\nContent: \`${msg.content ? msg.image : null}\``
    }
    i++
})

if (i == 0) {
    embed.setTitle(`There is nothing to snipe!`)
} else {
    if (i == 1) {
        embed.setTitle(`Here is the last deleted message in this channel!`)
    } else {
    embed.setTitle(`Here is the last ${i} deleted messages in this channel!`)
    }
    if(image){
    embed.setImage(image)
    } else{
    embed.setDescription(desc)
    }
  
}
embed.setTimestamp()

return message.channel.send(embed)

}
}
