const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const news = process.env.news;
const countries = require("./country.json");

module.exports = {
  name: "news",
  description: "Shows top 5 news headlines",
  async execute(message, args,client) {
    try {
        let country = args.join(" ");

        if(country.length != 2){
            country = countries[country];    
        }
        if(!country){
            const optionembed = new MessageEmbed()
             .setTitle('Country Options')
             .addField(
                 "Put correct country (ex: China or CN)"
             )
             .setColor('RANDOM')
             .setTimestamp()


             return message.channel.send({embeds:[optionembed]});
                  
        }
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&apiKey=${news}`
      );
      const json = await response.json();
      const articleArr = json.articles;
      let processArticle = (article) => {
        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(article.title)
          .setURL(article.url)
          .setAuthor(article.author)
          .setDescription(article.description)
          .setThumbnail(article.urlToImage)
          .setTimestamp(article.publishedAt)
          .setFooter(message.guild.name, message.guild.iconURL());
        return embed;
      };
      async function processArray(array) {
        for (const article of array) {
          const msg = await processArticle(article);
          message.channel.send({embeds:[msg]});
        }
      }
      await processArray(articleArr);
    } catch (e) {
      console.log(e);
      message.channel.send("Something failed along the way");
    }
  },
};
