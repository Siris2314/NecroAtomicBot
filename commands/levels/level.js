const Discord = require('discord.js')
const Levels = require('discord-xp')
const canvacord = require('canvacord')

module.exports = {
    name:'level',
    description:'Returns levels of a user',

    async execute(message,args,client){
        const target = message.mentions.users.first() || message.author

        const user = await Levels.fetch(target.id, message.guild.id)

        if(!user) return message.channel.send("User has not earned any XP so far")

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        var img = "https://cdn.discordapp.com/attachments/779452147326648360/803042845363011624/unknown.png";
        if(message.guild.id === '798700075517870120'){
            img = './Background.png'
        }

        const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL({dynamic: false, format:'png'}))
            .setBackground("IMAGE", img)
            .setRank(1, 'RANK', false)
            .setLevel(user.level)
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(target.presence.status)
            .setProgressBar("#F00000", "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

    rank.build()
        .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });
    }
}