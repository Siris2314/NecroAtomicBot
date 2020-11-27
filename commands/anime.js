const Discord = require('discord.js')
const Anime = require('anime-scraper').Anime

module.exports = {

  name:"anime",
  description:"Gets links for an anime",

  execute(message,args, client){

    const cmd = args.join(" ").split(' | ')

    if(!cmd[0]){
      return message.channel.send("Give an anime name to lookup")
    }
    if(!cmd[1]){
      return message.channel.send("Please give anime ep number")
    }

      Anime.fromName(cmd[0]).then(function (anime){
    anime.episodes[cmd[1] - 1].fetch().then(function(episode){

      let embed = new Discord.MessageEmbed()
        .setTitle(`Anime - ${cmd}`)
        .setColor("RANDOM")
        .addField(episode.videoLinks[0].name, `[LINK 1](${episode.videoLinks[0].url})`, true)
        .addField(episode.videoLinks[1].name, `[LINK 2](${episode.videoLinks[1].url})`, true)
        .addField(episode.videoLinks[2].name, `[LINK 3](${episode.videoLinks[2].url})`, true)
        .addField(episode.videoLinks[3].name, `[LINK 4](${episode.videoLinks[3].url})`, true)
        .addField(episode.videoLinks[4].name, `[LINK 5](${episode.videoLinks[4].url})`, true)

        message.channel.send(embed)

    })
  })
  }
}
