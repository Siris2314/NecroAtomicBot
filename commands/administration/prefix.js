const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../schemas/Guild');

module.exports = {
    name: 'prefix',
    description: 'Sets the prefix for this server.',
    async execute(message, args,client){
        message.delete();

        if (!message.member.permissions.has('MANAGE_GUILD')) {
            return message.channel.send({content:'You do not have permission to use this command!'})
        };

        if(!message.guild.me.permissions.has('MANAGE_GUILD')) {
            return message.channel.send({content:'I do not have enough perms to use this command!'})
        }

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send({content:'This server was not in our database! We have added it, please retype this command, your current prefix is !necro'}).then(m => m.delete({timeout: 100000}));
            }
        });

        if (args.length < 1) {
            return message.channel.send({content:`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``}).then(m => m.delete({timeout: 100000}));
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send({content:`Your server prefix has been updated to \`${args[0]}\``});
    }
}