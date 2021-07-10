const Discord = require('discord.js')

module.exports = {
    name:"hackban",
    description:"Ban members outside the server",

    async execute(message,args,client){

        var perms = message.member.hasPermission("BAN_MEMBERS");
        if(!perms) return message.channel.send("Perms Denied")

        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have perms")

        const reason = args.slice(1).join(" ") || "No reason provided";
        const id = args.join(' ')
        if(!id) return message.channel.send("Please provide ID of member to ban")

        const member = await client.users.fetch(id);
        message.guild.members.ban(member.id);

        const banEmbed = new MessageEmbed()
        .setTitle('Banned Member(Outside of Server Ban)!')
        .setDescription(`${member.username} was successfully banned.`)
        .addField('Moderator', message.member, true)
        .addField('Member', member, true)
        .setColor("RANDOM")
        .addField('Reason', reason)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({
            dynamic: true
        }))
        .setTimestamp()

    
        return message.channel.send(banEmbed);
    }
}