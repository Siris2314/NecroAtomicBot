const Discord = require('discord.js');

module.exports = {
    name:'listbans',
    description:'Lists Banned Users in a Guild', 


    async execute(message, args,client){

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.channel.send({content:"Invalid Perms"});
          }
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            return message.channel.send({content:"I do not have permission to access this command"});
        }
       
        var amount = 1;
        const fetchBans = message.guild.bans.fetch()
        const bannedMembers = (await fetchBans)
            .map((member) => `${amount++} **${member.user.username}** | (*${member.user.id}*)`)
            .join("\n");
        const bansEmbed = new Discord.MessageEmbed()
            .setAuthor(`Banned Members in ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setDescription(`${bannedMembers}`)
            .setFooter(`Amount: ${amount - 1}`)
            .setTimestamp()
            .setColor("RANDOM")
        return message.channel.send({embeds:[bansEmbed]})

        



    }

}