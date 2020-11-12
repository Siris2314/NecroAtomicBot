const Discord = require('discord.js');

module.exports = {

  name: "ship",
  description: "Relationship Calculator",

  execute(message,args){

    let user1 = message.mentions[0];
    let user2 = message.mentions[1];


    // if(!user1){
    //   return message.channel.send("Please enter a username")
    // }
    // else if(!user2){
    //   return message.channel.send("Please enter a second username")
    // }



    let c = (Math.random() * 100) + 1;

    let chance = parseInt(c);


    let embed = new Discord.MessageEmbed()
      .setTitle(`**Relationship Calculator**`)
      .setColor("RANDOM")
      .addField(`${user1} and ${user2} chances of a relationship are ${chance}%`)


      message.channel.send(embed);



  }
}
