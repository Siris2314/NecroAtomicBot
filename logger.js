const Discord = require('discord.js')
const Schema = require('./schemas/modlogs')
const auditid = '798702099273482241';
module.exports = c => {
    console.log("Loaded Logger Module".green)
    try{
        c.on("channelCreate", function(channel){
            send_log(c, channel.guild, "GREEN", "Channel Created", `ChannelName: ${channel.name}
            ChannelId: ${channel.id}
            ChanelType: ${channel.type}
            `)
        })
        c.on("channelDelete", function(channel){
            send_log(c, channel.guild, "RED", "Channel Deleted", `ChannelName: ${channel.name}
            ChannelId: ${channel.id}
            ChanelType: ${channel.type}
            `)
        })

    } catch (e){
        console.log(String(e.stack).yellow)
    }

}

async function send_log(client, guild,color, title, description,thumb){

    try{
     await Schema.findOne({Guild:guild.id}, async(err, data) => {
        if(!data) return;
        const auditchannel = data.Channel;
        const logembed = new Discord.MessageEmbed()
            .setColor(color ? color: "RANDOM")
            .setDescription(description ? description.substr(0,2048) : "\u200b")
            .setTitle(title ? title.substr(0,256) : "\u200b")
            .setThumbnail(thumb ? thumb: guild.iconURL({format: "png"}))
            .setTimestamp()
            .setFooter(guild.name,guild.iconURL({format: "png"}))

        const logger = await client.channels.cache.get(auditchannel);
        logger.createWebhook(client.user.username, {
            avatar: client.user.displayAvatarURL({format:'png'})
        }).then(webhook => {
                webhook.send({
                    username: client.user.username,
                    avatarURL:client.user.displayAvatarURL({format:'png'}),
                    embeds: [logembed]
                })
                .then(msg => webhook.delete().catch(e => console.log(String(e.stack).yellow)))
                  .catch(e=> console.log(String(e.stack).yellow))
            })


    })
        
        
    }catch(e){
        console.log(String(e.stack).yellow)
    }

}