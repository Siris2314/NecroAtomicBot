const Discord = require('discord.js') 
const moment = require('moment')
module.exports = {
      name: 'userinfo',
      description: 'Displays info for a user',
      async execute(message, args,client){
        
        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS:'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };

        function trimArray(arr, maxLen = 10){
            if(arr.length > maxLen){
                const len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push(`${len} more...`)
            }
            return arr;
        }

        const member = message.mentions.members.first() || message.member;
        const roles = member.roles.cache 
            .sort((a,b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0,-1)

        const userFlags = member.user.flags.toArray();
        const embeduserinfo = new Discord.MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size:512}))
            .setAuthor("Information about: " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .addField('**Username:**', `\`${member.user.username}#${member.user.discriminator}\``,true)
            .addField('**ID:**',`\`${member.id}\``,true)
            .addField('**Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({dynamic: true})})`,true)
            .addField('**Registered Date:**',`\`${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()} \``, true)
            .addField('**Date Joined Server:**',`\`${moment(member.joinedAt).format('LL LTS')}\``,true)
            .addField('**Flags:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
            .addField('**Status:**',`\`${member.user.presence.status}\``,true)
            .addField('**Game**:',`\`${member.user.presence.game || 'Not Currently Playing a Game.'}\``,true)
            .addField('**Highest Role:**',`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`,true)
            .addField(`\`${roles.length}\` **Roles:**`,`${roles.length < 10 ? roles.join(', '): roles.length > 10 ? trimArray(roles): 'None'}`)
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()


        return message.channel.send(embeduserinfo);



        
    }
}
