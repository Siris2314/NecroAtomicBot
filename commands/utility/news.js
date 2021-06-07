const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const news = process.env.news;

module.exports = {
  name: "news",
  description: "Shows top 5 news headlines",
  async execute(message, args,client) {
    try {
        const country = args.join(" ");
        if(!country){
            const optionembed = new MessageEmbed()
             .setTitle('Country Options')
             .addField(
                 'Argentina - ar\n',
                 'Australia - au\n',
                 'Austria - at\n',
                 'Belguim - be\n',
                 'Brazil - br\n',
                 'Bulgaria - bg\n',
                 'Canada - ca\n',
                 'China - cn\n',
                 'Colombia - co\n',
                 'Cuba - cu\n',
                 'Czech Republic - cz\n',
                 'Egypt - eg\n',
                 'France - fr\n',
                 'Germany - de\n',
                 'Greece - gr\n',
                 'Hong Kong - hk\n',
                 'Hungary - hu\n',
                 'India - in\n',
                 'Indonesia - id\n',
                 'Ireland - ie\n',
                 'Isreal - il\n',
                 'Italy - it\n',
                 'Japan - jp\n',
                 'Latvia - lv\n',
                 'Lituania - lt\n',
                 'Malaysia - my\n',
                 'Mexico - mx\n',
                 'Morocco - ma\n',
                 'Netherlands - nl\n',
                 'New Zeland - nz'
             )
             .setColor('RANDOM')
             .setTimestamp()


            return message.channel.send(optionembed);


                  

                  
             
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
          message.channel.send(msg);
        }
      }
      await processArray(articleArr);
    } catch (e) {
      console.log(e);
      message.channel.send("Something failed along the way");
    }
  },
};