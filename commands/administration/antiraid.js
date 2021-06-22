const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../schemas/antiraid')

module.exports = {
    name: 'antiraid',
    description: 'Enables anti-raid, allowing to counter raids by instantly kicking members who join',
    usage:'<prefix> antiraid enable/disable',
    async execute(message, args,client){
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permission \`ADMINISTRATOR\`')
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the permission \`KICK_MEMBERS\`')
        options = [
            'enable',
            'disable'
        ]

        if (!args.length) return message.reply("Please enter either **enable** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Please enter either **enable** or **disable**')


        if (!options.includes(opt)) return message.reply('Please enter either **enable** or **disable**')

        if(opt === 'enable') {
                schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(!data) {
                        data = new schema({
                            Guild: message.guild.id,
                        })
                        data.save()
                        const embed = new MessageEmbed()
                         .setTitle(':white_check_mark: Anti-Raid Mode Enabled')
                         .setThumbnail(message.guild.iconURL({dynamic: true}))
                         .setDescription(`${message.author.username} has enabled Anti-Raid`)
                         .setFooter(`${message.guild.name}`)
                         .setTimestamp()
                        return message.channel.send(embed)
                    } else{
                        message.channel.send(`Anti-raidmode is already enabled`)
                    }
                })
            
        }

        if(opt === 'disable') {
            schema.findOne({ Guild: message.guild.id}, async(err,data) =>{
            if(!data) return message.channel.send('The Anti-raidmode has already been disabled')
            data.delete()
            const embed = new MessageEmbed()
            .setTitle(':white_check_mark: Anti-Raid Mode Disabled')
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setDescription(`${message.author.username} has disabled Anti-Raid`)
            .setFooter(`${message.guild.name}`)
            .setTimestamp()
            
            })
            return message.channel.send(embed)
            
        }
    }
}