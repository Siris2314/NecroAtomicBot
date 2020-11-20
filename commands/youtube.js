const ytdl = require('ytdl-core');
const Discord = require('discord.js')
const YouTube = require('simple-youtube-api')
const { youtube } = require('../botconfig.json');


module.exports = {

  name: "youtube",
  description: "searchs on yt",


  async execute(message,args){

    const yt = new YouTube(youtube)
    const searchString = args.slice(1).join(' ')
    const url = args[0] ? args[0].replace(/<(._)>/g, '$1') : ''
    var video = await yt.getVideoByID(url)
    console.log(video, url);
    yt.getVideoByID(url).then(s => console.log(s));
    try {
      var video = await yt.getVideoByID(url)

    } catch(error){
      try {
        var videos = await yt.searchVideos(searchString, 1)
        var video = await yt.getVideosByID(videos[0].id)
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
