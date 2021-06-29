const Discord = require('discord.js')
const ytsr = require('ytsr')

module.exports = {
    name: 'ytsearch',
    description: 'Search For Videos On YouTube',

    async execute(message, args, client) {

        const query = args.join(' ');
        if (!query) return message.channel.send("Provide a search for me to search YouTube!");
    
        const res = await ytsr(query).catch(e => message.channel.send(`No results found for ${query}`));
        const video = res.items.filter(i => i.type === 'video')[0];
        const embed = new Discord.MessageEmbed()
          .setTitle(video.title)
          .setURL(video.url)
          .setImage(video.bestThumbnail.url)
          .setColor("RANDOM")
          .setDescription(video.description ? video.description : "No Description")
          .addField(`Song Information`,
                `**Creator**: [${video.author.name}](${video.author.url}) ${video.author.verified ? ":white_check_mark: (Verified)" : "Not-Verified"}
                **Length**: ${video.duration} minute(s)
                **Uploaded**: ${video.uploadedAt}
                **Views**: ${video.views.toLocaleString()}`,false
          )
          .setThumbnail(video.author.bestAvatar.url)
        message.channel.send(embed);
    }
}