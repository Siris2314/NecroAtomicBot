const genshin = require('genshin-db');
const Discord = require('discord.js');



module.exports = {
  name:'genshintalents',
  description:'Returns Talents of a specific Genshin character',

  async execute(message,args,client){
    const input = args.join(" ")
    const char = genshin.talents(input)
    const char2 = genshin.characters(input)
    const emojiList = ["⬅️", "➡️"]
    const timeout = 100000

    console.log(char)


    try{
      const embed = new Discord.MessageEmbed()
        .setTitle(`${char.name}'s Talents'`)
        .setThumbnail(char2.images.image)
        .setColor("RANDOM")
        .addFields(
          {name:char.combat1.name, value:char.combat1.info, inline:true},
          {name:`${char.combat2.name}:`, value:char.combat2.info, inline:true},
          {name:char.combat3.name, value:char.combat3.info, inline:true},
        )

      const embed2 = new Discord.MessageEmbed()
      .setTitle(`${char.name}'s Talents - Passive'`)
      .setThumbnail(char2.images.image)
      .setColor("RANDOM")
      .addFields(
        {name:char.passive1.name, value:char.passive1.info, inline:true},
        {name:char.passive2.name, value:char.passive2.info, inline:true},
        {name:char.passive3.name, value:char.passive3.info, inline:true},



      )
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))


      pages =[
          embed,
          embed2
        ];
        message.channel.createSlider(message.author.id,pages,emojiList[1], emojiList[0])


    } catch(err){
      message.channel.send("Character not in database")
    }
  }
}
