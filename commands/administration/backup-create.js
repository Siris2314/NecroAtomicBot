const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require("discord-backup")
module.exports = {
    name: 'backup-create',
    description: `Create a backup of the server`,
   
     async execute(message, args,client) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.channel.send({content:`:x: | You need to be an admin to make a backup!`});
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            message.author.send({content:`Created a backup of ${message.guild.name}, To load it use <prefix>backup-load ${backupData.id}`})
            message.channel.send({content:`Created the backup! Please check your dms`})
        })
    }
}