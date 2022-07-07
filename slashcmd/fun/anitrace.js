const axios = require('axios');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "anitrace",
    description: "Trace a anime by using a image",
    type: 'CHAT_INPUT',
    options: [
        {
          name: "image",
          description: "Image URL of the anime",
          type: "STRING",
          required: true,
        },
      ],

      run: async(client, interaction) => {
          try{  
            const image = interaction.options.getString('image')
            const traceDetails = await axios(
                `https://api.trace.moe/search?url=${encodeURIComponent(image)}`
              )
                .then((res) => res.data)
                .catch((err) => {
                    interaction.followUp("Unable to Fetch the image")
                })
                if (!traceDetails.result.length) return interaction.reply("No resoult found")
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
                  .setTitle(`Found! | ${animeDetails.title.english}`)
                  .setDescription(        animeDetails.description.substring(0, 200) +
                  ` **[[Read More](https://anilist.co/anime/${animeResult.anilist})]**`)
                  .addField(`Traced Image/Video`, `EP. ${animeResult.episode} [Video Clip](${animeResult.video}) | [Image](${animeResult.image})`, true)
                  .addField(`Status`, `${animeDetails.episodes} Episodes | ${animeDetails.status}`, true)
                  .setImage(animeDetails.bannerImage)
                  .setColor(animeDetails.coverImage.color
                    ? parseInt(animeDetails.coverImage.color.replace('#', '0x'))
                    : 0xffffff)
                  return interaction.followUp({embeds:[Embed]})

          }catch(err){
              interaction.followUp('An Error has Occured')
               console.log(err)
          }
      }
}