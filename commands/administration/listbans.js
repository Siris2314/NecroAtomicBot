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
       
        var amount = 1;
        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
            .map((member) => `${amount++} **${member.user.username}** | (*${member.user.id}*)`)
            .join("\n");
        const bansEmbed = new Discord.MessageEmbed()
        .setAuthor(`Bans for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
        .setDescription(`${bannedMembers}`)
        .setFooter(`Amount: ${amount - 1}`)
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send(bansEmbed)

        



    }

}