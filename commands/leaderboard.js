const Discord = require('discord.js')
const Levels = require('discord-xp')


module.exports = {
    name:'leaderboard',
    description:'Returns the top ten level leaderboard',

    async execute(message, args,client){

        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if(rawLeaderboard.length < 1) return message.channel.send("Nobody is in current leaderboard")

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`)

        const embed = new Discord.MessageEmbed()
         .setColor("RANDOM")
         .setTitle(`Leaderboard for ${message.guild.name}`)
         .setThumbnail(message.guild.iconURL())
         .setDescription(lb.join("\n\n"))

        message.channel.send(embed)
    }


}