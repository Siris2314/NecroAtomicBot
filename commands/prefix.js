const {MessageEmbed} = require('discord.js')
const mongoose = require('mongoose');
const Guild = require('../schemas/Guild')
require('dotenv').config();
const prefix = process.env.prefix;

module.exports = {
    name:'prefix',
    description:'Sets a custom prefix for a server',

    async execute(message,args,client){
        message.delete();

        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Perms Denied')


        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.log(err)
            if(!guild){
                const newGuild = new Guild({
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: prefix
                })

                newGuild.save().then(result => console.log(result)).catch(err => console.log(err))

              return message.channel.send('This server was not in our database so we set your prefix to !necro by default, retype this command to set a new prefix').then(m => m.delete({timeout:10000}))
            }

        });

        if(args.length < 1) return message.channel.send('Must specify a prefix for this server. Your current server prefix is \`${settings.prefix}\`').then(m => m.delete({timeout:10000}))

        const newPrefix = args[0]
        await settings.updateOne({
            prefix:newPrefix
        })

        return message.channel.send(`You server prefix has been updated to \`${newPrefix}\``);
    }
}