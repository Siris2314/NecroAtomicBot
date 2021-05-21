const Discord = require('discord.js')

module.exports = {
    name:"hackban",
    description:"Ban members outside the server",

    async execute(message,args,client){

        var perms = message.member.hasPermission("BAN_MEMBERS");
        if(!perms) return message.channel.send("Perms Denied")

        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have perms")

        const id = args.join(' ')
        if(!id) return message.channel.send("Please provide ID of member to ban")

        const member = await client.users.fetch(id);
        message.guild.members.ban(member.id);

        message.channel.send(`Member ${member.username} has been banned`)
    }
}