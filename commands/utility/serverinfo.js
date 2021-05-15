const Discord = require("discord.js");
 
module.exports = {
  name: 'serverinfo',
  description:'Shows Statistics about server',
 
  async execute(message, args,client) {
    if (!message.guild) return message.channel.send("this command is only meant to be used in servers.")
        function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
 
     
    
    
 
    const channels = message.guild.channels.cache.array();
    const textChannels = channels.filter(c => c.type === 'text').length;
    const voiceChannels = channels.filter(c => c.type === 'voice').length;
    const categoryChannels = channels.filter(c => c.type === 'category').length
 
 
  const region = {
    'us-central': `US Central`,
    'us-east': `US East`,
    'us-south': `US South`,
    'us-west': `US West`,
    'europe': `Europe`,
    'singapore': `Singapore`,
    'japan': `Japan`,
    'russia': `Russia`,
    'hongkong': `Hong Kong`,
    'brazil': `Brazil`,
    'sydney': `Sydney`,
    'southafrica': `South Africa`,
    'india': `India`,
    'europe': `Europe`
};
 
const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};
 
 
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField('Verification Level', verificationLevels[message.guild.verificationLevel], true)
        .addField("Members", `${message.guild.memberCount}`, true)
        .addField('Highest Role', message.guild.roles.highest, true)
        .addField('Emoji Count', `${message.guild.emojis.cache.size} Emojis`, true)
        .addField('Region', region[message.guild.region], true)
        .addField('Partnered', `${message.guild.partnered}`, true)
        .addField('Verified', `${message.guild.verified}`, true)
        .addField('Boosts', message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount}` : `0`, true)
        .addField("Channels", `${message.guild.channels.cache.size} Total\n${textChannels} Text\n${voiceChannels} Voice\n${categoryChannels} Total Categories`, true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setColor("#d4c5a2")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
    return message.channel.send(embed);
 
  }
}