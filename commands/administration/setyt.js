const {MessageEmbed} = require('discord.js')
module.exports = {

    name:'setyt',
    description:'Sets YT Posting for a channel in Server',

    async execute(message,args,client){

        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('Invalid Perms') 


        let ChannelLink = args[0];
        let DiscordChannel = message.mentions.channels.filter(c => c.guild.id == message.guild.id).first() || message.guild.channels.cache.get(args[1]);
        let DiscordUser = message.mentions.members.filter(m => m.guild.id == message.guild.id).first()?.user || message.guild.members.cache.get(args[2])?.user || message.author;
        let Notification = args.slice(3).join(" ") || client.YTP.options.defaults.Notification;

        if (!ChannelLink || !DiscordChannel || !DiscordUser) return message.channel.send(new MessageEmbed() .setTitle(':x: Command Error') .setDescription('Usage for command is <prefix> setyt <ytchannellink> <discordchannel> <discord user> <Notification>'))
        client.YTP.setChannel(ChannelLink, DiscordChannel, DiscordUser, Notification, preventDuplicates = true)
            .then(ch => {
                message.channel.send(new MessageEmbed() .setDescription(`Posting Notifications for ${ch.YTchannel} (<@${ch.DiscordUser}>) in <#${ch.DiscordChannel}>\n\nThe Message:\n${ch.message}`))


            }).catch((e) => {
                console.log(e);
                message.channel.send(`${e.message ? e.message : e}`, {
                    code: "js"

                })
            })






        }

    }






