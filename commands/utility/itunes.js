const { MessageEmbed } = require('discord.js')
const request = require("node-superfetch");
module.exports = {
    name: 'itunes',
    description:'Returns information about a song on iTunes(price, artist, etc.)',

 async execute( message, args,client) {

  try {
    const query = args.join('+');
    const {
      body
    } = await request
      .get('https://itunes.apple.com/search')
      .query({
        term: query,
        media: 'music',
        entity: 'song',
        limit: 1,
        explicit: message.channel.nsfw ? 'yes' : 'no'
      });
    const body2 = JSON.parse(body.toString());
    if (!body2.results.length) return message.channel.send('Could not find any results.');
    const data = body2.results[0];
        let price = data.trackPrice.toString().split("-")[1]
        if (price === undefined) {
            price = 0
        }
    const embed = new MessageEmbed()
      .setColor("4169e1")
      .setAuthor('iTunes', 'https://i.imgur.com/PR29ow0.jpg', 'https://www.apple.com/itunes/')
      .setURL(data.trackViewUrl)
      .setThumbnail(data.artworkUrl100)
      .setTitle(data.trackName)
      .addField('Artist', data.artistName, true)
      .addField('Album', data.collectionName, true)
      .addField('Release Date', new Date(data.releaseDate).toDateString(), true)
      .addField("Price", "$" + price, true)
            .addField('Length', (data.trackTimeMillis/1000) + "s", true)
      .addField('Genre', data.primaryGenreName, true);
    return message.channel.send({embeds:[embed]});
  } catch (err) {
    if (err.status === 404) return message.reply('Could not find any results.');
    console.log(err);
    return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
}
}
    }