const Discord = require('discord.js')
const Schema = require('./schemas/modlogs')
const auditid = '798702099273482241';
module.exports = c => {
    console.log("Loaded Logger Module".green)
    try{
        c.on("channelCreate", function(channel){
            send_log(c, channel.guild, "GREEN", "Channel Created", `ChannelName: ${channel.name}
            ChannelId: ${channel.id}
            ChannelType: ${channel.type}
            `)
        })
        c.on("channelDelete", function(channel){
            send_log(c, channel.guild, "RED", "Channel Deleted", `ChannelName: ${channel.name}
            \nChannelId: ${channel.id}
            \nChannelType: ${channel.type}
            `)
        })
        c.on("channelPinsUpdate", function(channel, time){
            send_log(c, channel.guild, "YELLOW", "Channel Pins Update", `ChannelName: ${channel.name}
            \nChannelId: ${channel.id}
            \nPinned At: ${time}
            `, 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/pushpin_1f4cc.png')


        })
        c.on("channelUpdate", function(oldChannel, newChannel){
            let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT"
            let guildChannel = newChannel.guild;
            if(!guildChannel || !guildChannel.available) return;

            let types = {
                text: "Text Channel",
                voice: "Voice Channel",
                null: "No Type",
                news: "News Channel",
                store: "Store Channel",
                category: "Category",
            }
            if(oldChannel.name != newChannel.name){
                send_log(c, oldChannel.guild, "Yellow", "Channel Updated - NAME", `Before: \nChannelName: ${oldChannel.name}
                \nChannelId: ${oldChannel.id}
                \n\n`+ `After: \nChannelName: ${newChannel.name}
                \nChannelId: ${newChannel.id}
                `)

            }
            else if(oldChannel.type != newChannel.type){
                send_log(c, oldChannel.guild, "Yellow", "Channel Updated - TYPE", `Before: \nChannelName: ${oldChannel.name}
                \nChannelId: ${oldChannel.id}
                \nChannelType: ${types[oldChannel.type]}
                \n\n`+ `After: \nChannelName: ${newChannel.name}
                \nChannelId: ${newChannel.id}
                \nChannelType: ${types[newChannel.type]}`)

            }
            else if(oldChannel.topic != newChannel.topic){
                if(oldChannel.topic == null){
                    oldChannel.topic = "None"
                }
                else if(newChannel.topic == null){
                    newChannel.topic = "None"
                }
                send_log(c, oldChannel.guild, "Yellow", "Channel Updated - TOPIC", `Before: \nChannelName: ${oldChannel.name}
                \nChannelId: ${oldChannel.id}
                \nChannelTopic: ${oldChannel.topic}
                \n\n`+ `After: \nChannelName: ${newChannel.name}
                \nChannelId: ${newChannel.id}
                \nChannelTopic: ${newChannel.topic}`)

            }
          
        })
        c.on("emojiCreate", function(emoji){
            send_log(c, emoji.guild, "GREEN","EMOJI CREATED" ,`EMOJI: ${emoji}\nEMOJI ID: ${emoji.id}\nEMOJI URL: ${emoji.url}`)
        })
        c.on("emojiDelete", function(emoji){
            send_log(c, emoji.guild, "RED", "EMOJI DELETED",`EMOJI: ${emoji}\nEMOJI ID: ${emoji.id}\nEMOJI URL: ${emoji.url}`)
        })
        c.on("emojiUpdate", function(oldEmoji, newEmoji){
            if(oldEmoji.name !== newEmoji.name){
                send_log(c, oldEmoji.guild, "ORANGE","EMOJI NAME CHANGED" ,`__Emoji: ${newEmoji}__\n\n**Before: ${oldEmoji.name}\n**After**: ${newEmoji.name} \nEmoji ID: ${newEmoji.id} `)
            }
        })
        c.on("guildBanAdd", function(guild, user){
            send_log(c, guild, "RED",`USER BANNED`, `User: ${user} (\n\`${user.id}\`)(\n\`${user.tag}\`)`)
        })
        c.on("guildBanRemove", function(guild, user){
            send_log(c, guild, "YELLOW",`USER UNBANNED`, `User: ${user} (\n\`${user.id}\`)(\n\`${user.tag}\`)`)
        })
        c.on("guildMemberAdd", function(member){
            send_log(c, member.guild, "GREEN","Member Joined",`Member: ${member.user} \n(\`${member.user.id}\`) \n(\`${member.user.tag}\`)`, member.user.displayAvatarURL({dynamic: true}))
        })
        c.on("guildMemberRemove", function(member){
            send_log(c, member.guild, "RED","Member LEFT",`Member: ${member.user} \n(\`${member.user.id}\`) \n(\`${member.user.tag}\`)`, member.user.displayAvatarURL({dynamic: true}))
        })
        c.on("guildMembersChunk", function(members, guild){
            send_logs(c, guild, "RED", `MEMBER RAID BAN, ${members.length} USERS BANNED`, members.map((user, index) => `${index}) - ${user} - ${user.tag} - ${user.id}`),
            )

        })
        // c.on("guildMemberUpdate", function(oldMember, newMember){
        //     let options = {}

        //     if(options[newMember.guildid]){
        //         options = options[newMember.guild.id]
        //     }

        //     if(typeof options.excludedroles === "undefined") options.excludedroles = new 
        // })





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