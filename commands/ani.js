const Discord = require("discord.js");
const Kitsu = require("kitsu.js")
const kitsu = new Kitsu();
const aq = require("animequote")
const fetch = require("node-fetch")


module.exports = {
  name: 'ani',
  description:'returns anime info',

  async execute(message,args, client){

    if(!args[0]){
      return message.channel.send('Please provide an anime name')
    }
    var search = message.content.split(/\s+/g).slice(1).join(" ")
    kitsu.searchAnime(search).then(async result => {
      if(result.length === 0){
        return message.channel.send("No Result Found")
      }

      var anime = result[0]

      const embed = new Discord.MessageEmbed()
      .setTitle(anime.titles.english ? anime.titles.english : search)
      .setColor("RANDOM")
      .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .addField('>Information', `**Japanese Name** ${anime.titles.romaji}\n **Age Rating:** ${anime.ageRating}\n\**Is NSFW: ** ${anime.nsfw ? 'Yes' : 'No'}`, true)
      .addField('>Stats', `**Average Rating:** ${anime.averageRating}\n\**Rank by rating:** ${anime.rankRating}\n\**Rank by popularity:** ${anime.popularityRank}`, true)
      .addField('>Status',`**Episode Count:** ${anime.episodeCount ? anime.episodeCount: 'N/A'}\n`, true)
      .setThumbnail(anime.posterImage.original, 100, 200)

      return message.channel.send(embed);
    }).catch(err => {
      message.channel.send("No Result Found")
    })
  }
}
