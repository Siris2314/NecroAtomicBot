const ytdl = require('ytdl-core');
const Discord = require('discord.js')
const YouTube = require('simple-youtube-api')


module.exports = {

  name: "youtube",
  description: "searchs on yt",


  async execute(message,args){




    const youtube = new YouTube('AIzaSyDj2B2QhOqiRBOtw73THhklOsJRvYtLlOY')
    const searchString = args.slice(1).join(' ')
    const url = args[1] ? args[1].replace(/<(._)>/g, '$1') : ''

    try {
      var video = await youtube.getVideoByID(url)

    } catch(error){
      try {
        var videos = await youtube.searchVideos(searchString, 1)
        var video  = await youtube.getVideosByID(videos[0].id)
      } catch(error){
        return message.channel.send("Could not find result")
      }

  }

    const song = {
      id: video.id,
      title: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`
    }

   const embed  = new Discord.MessageEmbed()
    .setTitle(`Youtube Vid: ${video}`)
    .setDescription('')

   message.channel.send(embed)

}
}
