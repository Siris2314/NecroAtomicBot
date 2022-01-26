const genshin = require('genshin-db');
const Discord = require('discord.js');
const reactionMenu = require("discordv13-pagination")


module.exports = {
  name:'genshinconst',
  description:'Returns the constellation of a character',

  async execute(message, args,client){

    const input = args.join(" ")
    const char = genshin.constellations(input)
    const char2 = genshin.characters(input)
    



    try{


    const embed = new Discord.MessageEmbed()
      .setTitle(`${char.name}'s Constellations`)
      .setThumbnail(char2.images.image)
      .setColor("RANDOM")
      .addFields(
        {name:`Constellation 1: ${char.c1.name}`, value:char.c1.effect, inline:true},
        {name:`Constellation 2: ${char.c2.name}`, value:char.c2.effect, inline:false},
        {name:`Constellation 3: ${char.c3.name}`, value:char.c3.effect, inline:false},
      )

    const embed2 = new Discord.MessageEmbed()
     
    .setTitle(`${char.name}'s Constellations(4-6)`)
    .setThumbnail(char2.images.image)
    .setColor("RANDOM")
    .addFields(
      {name:`Constellation 4: ${char.c4.name}`, value:char.c4.effect, inline:true},
      {name:`Constellation 5: ${char.c5.name}`, value:char.c5.effect, inline:false},
      {name:`Constellation 6: ${char.c6.name}`, value:char.c6.effect, inline:false},
    )

    .setTimestamp()
    .setFooter({text:message.author.tag, iconURL:message.author.displayAvatarURL({dynamic: true})})


    reactionMenu(message,[embed, embed2])

    } catch(err){
      message.channel.send("Character not in database")
    }


  }
}
