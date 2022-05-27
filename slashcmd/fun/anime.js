const {getInfoFromName} = require('mal-scraper')
const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'anime',
    description: 'Search for an anime/manga',
    options:[ 
        {
            name:'query',
            description:'The name of the anime/manga',
            type:'STRING',
            required:true
        }
    ],

    run:async(client, interaction) => {

        const query = interaction.options.getString('query')

    getInfoFromName(query.toLowerCase(), true).then((res) =>{

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(String(res.title))
            .setDescription(`\`\`\`fix\n${res.synopsis}\`\`\``)
            .addFields([
        {
          name: "__Score and Score Stats:__",
          value: `
          **Score:** ${res.score}
          **Score Stats:** ${res.scoreStats}
          `,
          inline: true
        },
        {
          name: "__Rank and Popularity:__",
          value: `
          **Rank:** ${res.ranked}
          **Popularity:** ${res.popularity}
          `,
          inline: true
        },
        {
          name: "__Members and Favorites:__",
          value: `
          **Members:** ${res.members}
          **favorites:** ${res.favorites}
          `,
          inline: true
        },
        {
          name: "__Episodes and Durations:__",
          value: `
          **Episodes:** ${res.episodes}
          **Duration Per Episode:** ${res.duration}
          `,
          inline: true
        },
        {
          name: "__Aired and Broadcast:__",
          value: `
          **Aired:** ${res.aired}
          **Broadcast Every:** ${res.broadcast}
          `,
          inline: true
        },
        {
          name: "__Source And Ratings:__",
          value: `
          **Source:** ${res.source}
          **Rating:** ${res.rating}
          `,
          inline: true
        },
        {
          name: "__Characters And Roles:__",
          value: `\`\`\`${res.characters ? res.characters.map((x) => `${x.name}: ${x.role}`).join("\n") : "None"}\`\`\``,
        },
        {
          name: "__Staff And Role:__",
          value: `\`\`\`${res.staff ? res.staff.map((x) => `${x.name}: ${x.role}`).join("\n") : "None"}\`\`\``
        },
        {
          name: "__Producers:__",
          value: `\`\`\`${res.producers ? res.producers.join("\n") : "None"}\`\`\``
        }
      ])
      .setImage(res.picture)
      .setURL(res.url)
    interaction.followUp({ embeds: [embed] }).catch((err) => interaction.reply({ embeds: [{ description: `\`\`\`xl\n${err.message}\`\`\``, title: "Error Occured While Searching...", color: "RED" }] }))
    })
  }

    
}