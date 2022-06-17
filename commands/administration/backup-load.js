const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require("discord-backup")
module.exports = {
    name: 'backup-load',
    description:'Loads up server backup ',
    async execute(message, args,client){
        const p = await client.prefix(message)
        if(!message.member.id === message.guild.owner.id) return message.channel.send({content:`Only the owner of ${message.guild.name} Can run that command`})
        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }

        let backUpID = args[0];
        if(!backUpID) return message.channel.send({content:`Please provide the ID, The bot must have dmed you before when you created a backup`})
        backup.fetch(backUpID).then(async () => {
            message.channel.send({content:`⚠ | When the backup is loaded, all the channels, roles, etc. will be replaced! Type "${p}confirm" to confirm!`});
            await message.channel.awaitMessages(m => (m.author.id) && (m.content === `${p}confirm`), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
                return message.channel.send({content:`⚠ | Time up you were to late to answer, cancelled, try again!`})
            });

            message.author.send({content:`Loading the backup`})
            message.channel.send({content:`Loading....`})
            backup.load(backUpID, message.guild).then(() => {
                backup.remove(backUpID)
            }).catch((err) => {
                return message.channel.send({content:`An error occured | Please make sure my roles is above all the roles and i have admin permissions`})
            })
        }).catch((err) => {
            return message.channel.send({content:":x: | No backup found for `"+backUpID+"`!"})
        })
    }
}