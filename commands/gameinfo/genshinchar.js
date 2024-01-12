const genshin = require('genshin-db');
const Discord = require('discord.js');

module.exports = {

  name:"genshinchar",
  description:"Returns Genshin Characters",

  async execute(message,args,client){

    const input = args.join(" ")

    const char = genshin.characters(input)
  


    try{

    const embed = new Discord.MessageEmbed()
      .setTitle(`**${char.name}**`)
      .setThumbnail(char.images.cover1)
      .setColor("RANDOM")
      .addFields(
        {name:"Titles:", value:String(char.title),inline:false},
        {name:"Element:", value:String(char.elementText),inline:false},
        {name:"Weapon Type:", value:String(char.weaponText),inline:false},
        {name:"Gender:", value:String(char.gender),inline:false},
        {name:"Region:", value:String(char.region),inline:false},
        {name:"Rarity:", value:String(char.rarity),inline:false},
        {name:"Birthday:", value:String(char.birthday),inline:false},
        {name:"Constellation:", value:String(char.constellation),inline:false},
        {name:"Substat:", value:String(char.substatText),inline:false},
        {name:"Affiliation:", value:String(char.affiliation),inline:false},
        {name:"Description:", value:String(char.description),inline:true},

      )

      .setTimestamp()
      .setFooter({text:message.author.tag, iconURL:message.author.displayAvatarURL({dynamic: true})})




    return message.channel.send({embeds:[embed]})

    } catch(err){
      console.log(err)
      message.channel.send("Character not in database")
    }







  }
}
