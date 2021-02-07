const Discord = require('discord.js')
const { get } = require("request-promise-native")

module.exports = {
  name:"poke",
  description: "Gets pokemon description",

  execute(message,args){

    const options = {
      url: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`,
      json: true
    }

    message.channel.send("Fetching Information for API").then(msg => {
      get(options).then(body => {
        let embed = new Discord.MessageEmbed()
         .setAuthor(body.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.typeIcon}`)
         .setDescription(body.info.description)
         .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.photo}`)
         .setColor("RANDOM")
         .setFooter(`Weakness of this pokemon - ${body.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.weaknessIcon}`)

     message.channel.send(embed);
     message.delete();
      })
    })
  }
}
