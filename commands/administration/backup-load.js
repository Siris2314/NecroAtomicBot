const { Client, Message, MessageEmbed } = require('discord.js');
const backup = require("discord-backup")
module.exports = {
    name: 'backup-load',
    description:'Loads up server backup ',
    async execute(message, args,client){
        const p = await client.prefix(message)
        if(!message.member.id === message.guild.owner.id) return message.channel.send(`Hey! Only the owner of ${message.guild.name} Can run that command`)

        let backUpID = args[0];
        if(!backUpID) return message.reply(`Please give me the id! The bot must have dmed you before when you created a backup!`)
        backup.fetch(backUpID).then(async () => {
            message.channel.send(`⚠ | When the backup is loaded, all the channels, roles, etc. will be replaced! Type "${p}confirm" to confirm!`);
            await message.channel.awaitMessages(m => (m.author.id) && (m.content === `${p}confirm`), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
                return message.channel.send(`⚠ | Time up you were to late to answer, cancelled, try again!`)
            });

            message.author.send(`Loading the backup`)
            message.channel.send(`Loading....`)
            backup.load(backUpID, message.guild).then(() => {
                backup.remove(backUpID)
            }).catch((err) => {
                return message.channel.send(`An error occured | Please make sure my roles is above all the roles and i have admin permissions`)
            })
        }).catch((err) => {
            return message.channel.send(":x: | No backup found for `"+backUpID+"`!")
        })
    }
}