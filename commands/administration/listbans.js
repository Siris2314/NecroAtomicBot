const Discord = require('discord.js');

module.exports = {
    name:'listbans',
    description:'Lists Banned Users in a Guild', 


    async execute(message, args,client){

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Invalid Perms");
          }
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Invalid Perms");
        }

        const bans = message.guild.fetchBans();

        const mapMember = (await bans)
            .map((member) => member.user.tag)
            .join(", ");

        const embed = new Discord.MessageEmbed() 
            .setTitle(`List of Banned Members ${message.guild.name}`)
            .setDescription(mapMember + "\n") 
            .setColor("RANDOM") 
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true})) 
            .setTimestamp()

        return message.channel.send(embed)

        



    }

}