// const { Client, Message, MessageEmbed, Role } = require('discord.js');
// const moment = require('moment')

// module.exports = {
//     name: 'serverinfo',
//     description:'Returns info on the server',
//   async execute(message, args,client){
//         const filterLevels = {
//             DISABLED: 'Off',
//             MEMBERS_WITHOUT_ROLES: 'No Role',
//             ALL_MEMBERS: 'Everyone'
//         };
//         const verificationLevels = {
//             NONE: 'None',
//             LOW: 'Low',
//             MEDIUM: 'Medium',
//             HIGH: 'High',
//             VERY_HIGH: 'Very High'
//         };
//         const vanityCode = message.guild.vanityURLCode;
//         let vanityInvite = `https://discord.gg/${vanityCode}`;
//         if (vanityCode === null) vanityInvite = 'No custom URL';
//         const members = message.guild.members.cache;
//         const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
//         const embed = new MessageEmbed()
//         .setTimestamp()
//         .setTitle("**Server Information**")
//         .setColor('RANDOM')
//         .setThumbnail(message.guild.iconURL({ dynamic: true }))
//         .addField(`🎫 Name of server:`, message.guild.name, true)
//         .addField(`🆔 ID of server`, message.guild.id, true)
//         .addField(`👑 Owner of this server is`, message.guild.owner, true)  
//         .addField(`🌎 Region of this server is`, message.guild.region, true)
//         .addField(`👥 No. of Members`, message.guild.members.cache.size, true)
//         .addField(`🤖 No. of Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
//         .addField(`🚶 Weights:`, message.guild.members.cache.filter(member => !member.user.bot).size, true)
//         .addField(`😗 Emojis:`, message.guild.emojis.cache.size, true)
//         .addField(`👻 Animated Emoji\'s:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size,true )
//         .addField(`💬 Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
//         .addField(`🎤 Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
//         .addField(`👔 Total Amount of Roles:`, message.guild.roles.cache.size, true)
//         .addField(`📅 Created at`, `${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).format('LTS')} ${moment(message.guild.createdTimestamp).fromNow()},`)
//         .addField(`🚀 Boost Tier`, `${message.guild.premiemTier ? `Tier ${message.guild.premiemTier}` : 'None'}`)
//         .addField(`💨 Boost Count`, `${message.guild.premiemSubscriptionCount}`)
//         .addField(`🔥 Explicit Filter`, `${filterLevels[message.guild.explicitContentFilter]}`)
//         .addField(`✔️ Verification Level`,`${verificationLevels[message.guild.verificationLevel]}`)
//         .addField(`🔗 Vanity Link`, `${vanityInvite}`)
//         .addField('Presence', [
//             `🟢 Online: ${members.filter(member => member.presence.status === 'online').size}`,
//             `🌙 Idle: ${members.filter(member => member.presence.status === 'idle').size}`,
//             `🔴 Do Not Disturb: ${members.filter(member => member.presence.status === 'dnd').size}`,
//             `⚫ Offline: ${members.filter(member => member.presence.status === 'offline').size}`,
//             '\u200b',
//             '**Other Information**',
//             `⚙️ Integrations: ${message.guild.fetchIntegrations().size ? message.guild.fetchIntegrations().size : 'No integrations'}`,
//             `⚡ Webhooks: ${message.guild.fetchWebhooks().size || '0'}`,
//             '\u200b'
//         ], true)
//         .addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(', ') : roles.length > 15 ? `${roles.slice(0, 15).join(', ')}\n+${roles.length-15} roles...` : 'None')
//         .setAuthor(`${message.guild.name}`)
//         .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

//         message.channel.send(embed);
// }
// }