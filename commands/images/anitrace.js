const axios = require('axios');
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "trace",
    description: "Traces Image to Return Anime name",

     async execute(message, args,client){

    try{
        const image = message.attachments.size > 0 ? message.attachments.first().url : null;
        if (!image) return message.channel.send("no image provided")
        const traceDetails = await axios(
            `https://api.trace.moe/search?url=${encodeURIComponent(image)}`
          )
            .then((res) => res.data)
            .catch((err) => {
                message.channel.send("unable to fetch the image")
            })
            if (!traceDetails.result.length) return message.channe.send("No resoult found")
            const animeResult = traceDetails.result[0];
            const animeDetails = await axios
              .post(`https://graphql.anilist.co`, {
                query: `query ($id: Int) {
                Media(id: $id, type: ANIME) {
                  title {
                    english
                  }
                  coverImage {
                    large
                    color
                  }
                  status
                  episodes
                  description
                  bannerImage
                }
              }`,
                variables: {id: animeResult.anilist},
              })
              .then((res) => (res.data ? res.data.data.Media : null))
              .catch((err) => {});
              const Embed = new MessageEmbed()
              .setTitle(`${animeDetails.title.english} | Founded`)
              .setDescription(        animeDetails.description.substring(0, 200) +
              ` **[[Read More](https://anilist.co/anime/${animeResult.anilist})]**`)
              .addField(`Traced Image/Video`, `EP. ${animeResult.episode} [Video Clip](${animeResult.video}) | [Image](${animeResult.image})`, true)
              .addField(`Status`, `${animeDetails.episodes} Episodes | ${animeDetails.status}`, true)
              .setImage(animeDetails.bannerImage)
              .setColor(animeDetails.coverImage.color
                ? parseInt(animeDetails.coverImage.color.replace('#', '0x'))
                : 0xffffff)
              return message.channel.send({embeds:[Embed]})

        }catch(err) {
            console.log(err)
        }
    }


}