const Discord = require('discord.js')
const moment = require('moment')
const Schema = require('./schemas/modlogs')
module.exports = c => {
    console.log("Loaded Logger Module".green)
    try{
        c.on("channelCreate", function(channel){

            let types = {
                GUILD_TEXT: "Text Channel",
                GUILD_VOICE: "Voice Channel",
                UNKNOWN: "No Type",
                GUILD_NEWS: "News Channel",
                GUILD_STORE: "Store Channel",
                GUILD_CATEGORY: "Category",
                GUILD_STAGE_VOICE:"Stage Channel"
            }
            send_log(c, channel.guild, "GREEN", "Channel Created", `\`\`\`yaml\nChannelName: ${channel.name} \nChannelId: ${channel.id} \nChannelType: ${types[channel.type]} \nChannel Category: ${channel.category}\`\`\``)
        })
        c.on("channelDelete", function(channel){
            let types = {
                GUILD_TEXT: "Text Channel",
                GUILD_VOICE: "Voice Channel",
                UNKNOWN: "No Type",
                GUILD_NEWS: "News Channel",
                GUILD_STORE: "Store Channel",
                GUILD_CATEGORY: "Category",
                GUILD_STAGE_VOICE:"Stage Channel"
            }
            send_log(c, channel.guild, "RED", "Channel Deleted", `\`\`\`yaml\nChannelName: ${channel.name} \nChannelId: ${channel.id} \nChannelType: ${types[channel.type]} \nChannel Category: ${channel.category}\`\`\``)
        })
        c.on("channelPinsUpdate", function(channel, time){
            send_log(c, channel.guild, "YELLOW", "Channel Pins Update", `\`\`\`yaml\nChannelName: ${channel.name} \nChannelId: ${channel.id} \nPinned At: ${time}\`\`\``, 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/pushpin_1f4cc.png')


        })
        c.on("channelUpdate", function(oldChannel, newChannel){
            let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT"
            let guildChannel = newChannel.guild;
            if(!guildChannel || !guildChannel.available) return;

            let types = {
                GUILD_TEXT: "Text Channel",
                GUILD_VOICE: "Voice Channel",
                null: "No Type",
                GUILD_NEWS: "News Channel",
                GUILD_STORE: "Store Channel",
                GUILD_CATEGORY: "Category",
                GUILD_STAGE_VOICE:"Stage Channel"
            }
            if(oldChannel.name != newChannel.name){
                send_log(c, oldChannel.guild, "YELLOW", "Channel Updated - NAME", `\`\`\`yaml\nBefore: \nChannelName: ${oldChannel.name} \nChannelId: ${oldChannel.id} \n\n`+ `After: \nChannelName: ${newChannel.name} \nChannelId: ${newChannel.id} \`\`\``)

            }
            else if(oldChannel.type != newChannel.type){
                send_log(c, oldChannel.guild, "YELLOW", "Channel Updated - TYPE", `\`\`\`yaml\nBefore: \nChannelName: ${oldChannel.name} \nChannelId: ${oldChannel.id} \nChannelType: ${types[oldChannel.type]} \n\n`+ `After: \nChannelName: ${newChannel.name} \nChannelId: ${newChannel.id} \nChannelType: ${types[newChannel.type]}\`\`\``)

            }
            else if(oldChannel.topic != newChannel.topic){
                if(oldChannel.topic == null){
                    oldChannel.topic = "None"
                }
                else if(newChannel.topic == null){
                    newChannel.topic = "None"
                }
                send_log(c, oldChannel.guild, "YELLOW", "Channel Updated - TOPIC", `\`\`\`yaml\nBefore: \nChannelName: ${oldChannel.name} \nChannelId: ${oldChannel.id} \nChannelTopic: ${oldChannel.topic} \n\n`+ `After: \nChannelName: ${newChannel.name} \nChannelId: ${newChannel.id} \nChannelTopic: ${newChannel.topic}\`\`\``)

            }
          
        })
        c.on("emojiCreate", function(emoji){
            send_log(c, emoji.guild, "GREEN","EMOJI CREATED" ,`\`\`\`yaml\nEMOJI: ${emoji} \nEMOJI ID: ${emoji.id} \nEMOJI URL: ${emoji.url}\`\`\``)
        })
        c.on("emojiDelete", function(emoji){
            send_log(c, emoji.guild, "RED","EMOJI DELETED" ,`\`\`\`yaml\nEMOJI: ${emoji} \nEMOJI ID: ${emoji.id} \nEMOJI URL: ${emoji.url}\`\`\``)
        })
        c.on("emojiUpdate", function(oldEmoji, newEmoji){
            if(oldEmoji.name !== newEmoji.name){
                send_log(c, oldEmoji.guild, "ORANGE","EMOJI NAME CHANGED" ,`__Emoji: ${newEmoji}__\n\n**Before: ${oldEmoji.name}\n**After**: ${newEmoji.name} \nEmoji ID: ${newEmoji.id} `)
            }
        })
        c.on("guildBanAdd", function(ban){
            send_log(c, ban.guild, "RED",`USER BANNED`, `\`\`\`yaml\nUser: ${ban.user.username} \nBanned User ID: ${ban.user.id} \nReason for Ban: ${ban.reason ? ban.reason : "No Reason Given"} \`\`\``)
        })
        c.on("guildBanRemove", function(ban){
            send_log(c, ban.guild, "ORANGE",`USER UNBANNED`, `\`\`\`yaml\nUser: ${ban.user.username} \nBanned User ID: ${ban.user.id} \n${ban.user.tag} \`\`\``)
        })
        c.on("guildMemberAdd", function(member){
            send_log(c, member.guild, "GREEN","Member Joined",`\`\`\`yaml\nMember: ${member.user.username} \nMember ID: ${member.user.id} \nMember Type: ${member.user.bot ? member.user.bot : "Guild Member"}\`\`\``, member.user.displayAvatarURL({dynamic: true}))
        })
        c.on("guildMemberRemove", function(member){
            send_log(c, member.guild, "RED","Member Left",`\`\`\`yaml\nMember: ${member.user.username} \nMember ID: ${member.user.id} \nMember Type: ${member.user.bot ? member.user.bot : "Guild Member"}\`\`\``, member.user.displayAvatarURL({dynamic: true}))
        })
        c.on("guildMembersChunk", function(members, guild, chunk){
            send_log(c, guild, "RED", `MEMBER RAID BAN, ${members.length} USERS BANNED`, members.map((user, index) => `${index}) - ${user} - ${user.tag} - ${user.id}`))

        })
        // c.on("guildMemberUpdate", function(oldMember, newMember){
        //     let options = {}

        //   if (options[newMember.guild.id]) {
        //       options = options[newMember.guild.id]
        //   }

        
        //   if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
        //   if (typeof options.trackroles === "undefined") options.trackroles = true
        //   const oldMemberRoles = oldMember.roles.cache.keyArray()
        //   const newMemberRoles = newMember.roles.cache.keyArray()
        //   const oldRoles = oldMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !newMemberRoles.includes(x))
        //   const newRoles = newMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !oldMemberRoles.includes(x))
        //   const rolechanged = (newRoles.length || oldRoles.length)

        //   if (rolechanged) {
        //       let roleadded = ""
        //       if (newRoles.length > 0) {
        //           for (let i = 0; i < newRoles.length; i++) {
        //               if (i > 0) roleadded += ", "
        //               roleadded += `<@&${newRoles[i]}>`
        //           }
        //       }
        //       let roleremoved = ""
        //       if (oldRoles.length > 0) {
        //           for (let i = 0; i < oldRoles.length; i++) {
        //               if (i > 0) roleremoved += ", "
        //               roleremoved += `<@&${oldRoles[i]}>`
        //           }
        //       }
        //       let text = `${roleremoved ? `❌ ROLE REMOVED: \n${roleremoved}` : ""}${roleadded ? `✅ ROLE ADDED:\n${roleadded}` : ""}`
        //       send_log(c,
        //         oldMember.guild,
        //         `${roleadded ? "GREEN" : "RED"}`,
        //         "Member ROLES Changed",
        //         `Member: ${newMember.user}\nUser: \`${oldMember.user.tag}\`\n\n${text}`,
        //         )
        //   }

        // })
        c.on("messageDelete", function(message){
           
                if(message.author == null || message.author.bot) return;
                if(!message.channel.type ==  "GUILD_TEXT") return;

                send_log(c, message.guild, "ORANGE", "MESSAGE DELETED",`\`\`\`yaml\nAuthor: ${message.author.tag} \nDate: ${moment(message.createdTimestamp).format('LL')} ${moment(message.createdTimestamp).format('LT')}, ${moment(message.createdTimestamp).fromNow()} \nChannel: ${message.channel.name} \nDeleted Message: ${message.content.replace(/`/g, "'")} \nAttachment URL: ${message.attachments.map(x => x.proxyURL) ? message.attachments.map(x => x.proxyURL) : 'No Images Sent'}\`\`\``)

                
            
        })
        c.on("messageDeleteBulk", function(messages){
            send_log(c, messages.first().guild,"RED", `Bulk Delete: ${messages.size} messages`, `\`\`\`yaml\n${messages.size} Messages Deleted in ${messages.first().channel.name}\`\`\``)
        })
        c.on("messageUpdate", function(oldMessage, newMessage){
            if(oldMessage.author == null) return;
            
            if(!oldMessage.channel.type  == "GUILD_TEXT") return;
            if(!newMessage.channel.type == "GUILD_TEXT") return;
        
         

            if(oldMessage.content === newMessage.content) return;
            send_log(c, oldMessage.guild, "YELLOW", "MESSAGE UPDATED", `**Author : ** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*
            **Date : ** ${moment(newMessage.createdTimestamp).format('LL')} ${moment(newMessage.createdTimestamp).format('LT')}, ${moment(newMessage.createdTimestamp).fromNow()}
            **Channel : ** <#${newMessage.channel.id}> - *${newMessage.channel.name}*
            **Original Message : ** 
            \`\`\`yaml\n${oldMessage.content.replace(/`/g, "'")} \`\`\`}
            **Updated Message : ** 
            \`\`\`yaml\n${newMessage.content.replace(/`/g, "'")} \`\`\`}`)})
        c.on("roleCreate", function(role) {
            send_log(c, role.guild, "GREEN", "ROLE CREATED",
            `ROLE: ${role}\nROLENAME: ${role.name}\nCOLOR: ${role.hexColor}\n POSITION: ${role.position}`)
        })
        c.on("roleDelete", function(role){
            send_log(c, role.guild, "RED", "ROLE DELETED",
            `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nCOLOR: ${role.hexColor}\n POSITION: ${role.position}`)

        })
        c.on("roleUpdate", function(oldRole, newRole){
            if(oldRole.name !== newRole.name){
                send_log(c, oldRole.guild, "ORANGE","ROLE NAME CHANGED", `__ROLE: ${oldRole}__ \n\n **Before:** \`${oldRole.name}\ 
                **After:** \`${newRole.name}\
                **Role ID:** \`${newRole.id}\``)
            }
            else if(oldRole.color !== newRole.color){
                send_log(c, oldRole.guild, "ORANGE","ROLE COLOR CHANGED", `__ROLE: ${oldRole}__ \n\n **Before:** \`${oldRole.color.toString(16)}\ 
                **After:** \`${newRole.color.toString(16)}\
                **Role ID:** \`${newRole.id}\``)

            }
            else{
                send_log(c, oldRole.guild,"RED" ,"ROLE PERMS CHANGED",
                `__ROLE: ${newRole}__ \n **THE PERMISSIONS CHANGED PLEASE CHECK**\n **Role ID: \`${newRole.id}\``)
            }
        })
        c.on("voiceStateUpdate", function(oldState, newState){
        
            if(oldState.channel == null && newState.channel){
                send_log(c, oldState.guild, "BLUE", `Member connected to VC`, `${newState.member} has connected to ${newState.channel}`)
            }
            else if(oldState.channel !== newState.channel && (newState.channelId !== null)){
                send_log(c, oldState.guild, "BLUE", `Member has switched voice channels`,`${newState.member} switched from ${oldState.channel} => ${newState.channel}`)
            }
            else if(newState.channelId == null){
                send_log(c, oldState.guild, "RED", `Member disconnected from VC`, `${oldState.member} has disconnected from ${oldState.channel}`)
            }


    
        })
        c.on("guildUpdate", function(oldGuild, newGuild){
            if(oldGuild.premiumSubscriptionCount < newGuild.premiumSubscriptionCount){
                const difference = newGuild.premiumSubscriptionCount - oldGuild.premiumSubscriptionCount;

                send_log(c, oldGuild, "BLUE", `Server Boosts Increase`,`Your boosts have increased by ${difference} boosts`)
            }
            else if(oldGuild.premiumSubscriptionCount > newGuild.premiumSubscriptionCount){
                const difference = oldGuild.premiumSubscriptionCount - newGuild.premiumSubscriptionCount;

                send_log(c, oldGuild, "RED", `Server Boosts Decrease`,`Your boosts have decreased by ${difference} boosts`)

            }
        })
        c.on('stickerCreate', function(sticker) {

            send_log(c, sticker.guild, "BLUE", 'New Sticker Created', `Sticker ${sticker} \nSticker ID: ${sticker.id} \nSticker Name: ${sticker.name} \nAdded By ${sticker.user}`, sticker.url) 




        })

        c.on('threadCreate', function(thread) {

            const guild = thread.guild;

            const member = guild.members.cache.get(thread.ownerId);

            const archive = thread.autoArchiveDuration / 60;

            const name = thread.name;

            const parent = thread.parent;

            let locked = '';


            if(thread.locked){
                locked = 'Thread is Locked'
            }
            else{
                locked = 'Thread is not Locked'
            }

            send_log(c, guild, "BLUE", 'New Thread Created', `\`\`\`yaml\nThread Name: ${name} \nThread Creator: ${member.user.username} \nThread Channel: ${parent.name} \nTime of Message for Thread: ${moment(thread.createdTimestamp).format('LL')} ${moment(thread.createdTimestamp).format('LT')}, ${moment(thread.createdTimestamp).fromNow()} \nDuration for Inactivity Thread: ${archive} hours \nLocked: ${locked} \`\`\``)
            
        })

        c.on('threadDelete', function(thread) {

            const guild = thread.guild;

            const member = guild.members.cache.get(thread.ownerId);

            const archive = thread.autoArchiveDuration / 60;

            const name = thread.name;

            const parent = thread.parent;



            if(thread.locked){
                locked = 'Thread is Locked'
            }
            else{
                locked = 'Thread is not Locked'
            }
            

            send_log(c, guild, "RED", 'Thread Deleted', `\`\`\`yaml\nThread Name: ${name} \nThread Creator: ${member.user.username} \nThread Channel: ${parent.name} \nTime of Deletion: ${moment(thread.archivedTimestamp).format('LL')} ${moment(thread.archivedTimestamp).format('LT')}, ${moment(thread.archivedTimestamp).fromNow()} \nTime the thread was up for: ${archive} hours \`\`\``)




        })

        c.on('threadMembersUpdate', function(oldMembers, newMembers) {


            console.log(oldMembers.size)
            console.log(oldMembers.size)


        })


        






    } catch (e){
        console.log(String(e.stack).yellow)
    }

}

async function send_log(client, guild,color, title, description,thumb){

    try{
    
     await Schema.findOne({Guild:guild.id}, async(err, data) => {
        if(!data) return;
      
        const logembed = new Discord.MessageEmbed()
            .setColor(color ? color: "RANDOM")
            .setDescription(description ? description.substr(0,2048) : "\u200b")
            .setTitle(title ? title.substr(0,256) : "\u200b")
            .setThumbnail(thumb ? thumb: guild.iconURL({format: "png"}))
            .setTimestamp()
            .setFooter(guild.name,guild.iconURL({format: "png"}))
        

    
        const logger = await client.channels.cache.get(data.Channel);
       

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