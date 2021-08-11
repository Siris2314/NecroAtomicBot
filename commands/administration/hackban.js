const Discord = require('discord.js')

module.exports = {
    name:"hackban",
    description:"Ban members outside the server",

    async execute(message,args,client){

        var perms = message.member.permissions.has("BAN_MEMBERS");
        if(!perms) return message.channel.send({content:"Perms Denied"})

        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({content:"I do not have perms"})

        const reason = args.slice(1).join(" ") || "No reason provided";
        const id = args.join(' ')
        if(!id) return message.channel.send({content:"Please provide ID of member to ban"})

        const member = await client.users.fetch(id);
        message.guild.members.ban(member.id);


        const banEmbed = new Discord.MessageEmbed()
            .setTitle('Outside of Server Ban')
            .setDescription(`${member.username} was successfully banned.`)
            .addField('Moderator', message.author.username, true)
            .addField('Member', member.username, true)
            .setColor("RANDOM")
            .addField('Reason', reason)
            .setThumbnail(member.displayAvatarURL({dynamic:true}))
            .setFooter(message.author.username, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp()

    
        return message.channel.send({embeds:[banEmbed]})
    }
}