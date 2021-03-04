const genshin = require('genshin-db');
const Discord = require('discord.js');


module.exports = {
  name:'genshinconst',
  description:'Returns the constellation of a character',

  async execute(message, args,client){

    const input = args.join(" ")

    const char = genshin.constellations(input)
    const char2 = genshin.characters(input)

    console.log(char)


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

    return message.channel.send(embed)

    } catch(err){
      message.channel.send("Character not in database")
    }


  }
}
