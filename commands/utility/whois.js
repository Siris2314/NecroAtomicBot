const Discord = require('discord.js');
require('dotenv').config()
const token = process.env.token
const axios = require('axios')
const moment = require('moment');
module.exports = {
      name: 'whois',
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

        const status = {
            online: "Online",
            idle: "Idle",
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible"
        };

        function trimArray(arr, maxLen = 10){
            if(arr.length > maxLen){
                const len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push(`${len} more...`)
            }
            return arr;
        }

        function getRoles(rls) {
            if(!rls.length) return "None";
            if(rls.length <= 10) return rls.join(", ")
            return trimArray(rls)
         }


        let url = '';

        const member = message.mentions.members.first()  || message.guild.members.cache.get(args[0]) || message.member;
        const user = message.mentions.users.first() || message.author;
        const roles = member.roles.cache 
            .sort((a,b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0,-1)



        console.log(member.presence);

        axios
            .get(`https://discord.com/api/users/${member.user.id}`, {
             headers: {
                Authorization:`Bot ${token}`,
             },
            
        })
      .then((res) => {
          const {banner, accent_color} = res.data;

          if(banner){
            const extension = banner.startsWith("a_") ? '.gif' : '.png'
            url = `https://cdn.discordapp.com/banners/${member.user.id}/${banner}${extension}`


        let userflags = [];
        if(member.user.flags === null){
            userflags = [];
        }
        else{
            userflags = member.user.flags.toArray();
        }

        


        const devices = member.presence?.clientStatus  || {};

        const entries = Object.entries(devices)
            .map((value,index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`)
            .join("\n");        

        const embeduserinfo = new Discord.MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size:512}))
            .setAuthor("Information about: " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .addField('**Username:**', `\`${member.user.username}#${member.user.discriminator}\``,true)
            .addField('**ID:**',`\`${member.id}\``,true)
            .addField('**Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({dynamic: true})})`,true)
            .addField('**Registered Date:**',`\`${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LT')}, ${moment(member.user.createdTimestamp).fromNow()} \``, true)
            .addField('**Date Joined Server:**',`\`${moment(member.joinedAt).format('LL LTS')}\``,true)
            .addField('**Flags:**',`\`${userflags.length ? userflags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
            .addField('**Status:**',`\`${(member.presence !== null) ? status[member.presence.status] : 'Offline'}\``,true)
            .addField('Devices Currently Using: ',`${Object.entries(devices).length}`)
            .addField('Currently On Device', `\`${Object.entries(devices).length > 0 ? entries : 'None'}\``)
            .addField('**Activity**:',`\`${member.presence.activities[0].name}\n${member.presence.activities[0].details}\n${member.presence.activities[0].state}\`` || 'Not Currently in an Activity.',true)
            .addField('**Highest Role:**',`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`,true)
            .addField(`\`${roles.length}\` **Roles:**`,`${getRoles(roles)}`)
            .setFooter({text:message.author.username, iconURL:message.author.displayAvatarURL({dynamic: true})})
            .setColor("RANDOM")
            .setImage(url)
            .setTimestamp()


            return message.channel.send({embeds:[embeduserinfo]})
          }
          else{
            let userflags = [];
            if(member.user.flags === null){
                userflags = [];
            }
            else{
                userflags = member.user.flags.toArray();
            }
            
    
    
            const devices = member.presence?.clientStatus  || {};
            const entries = Object.entries(devices)
            .map((value,index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`)
            .join("\n");
            const embeduserinfo = new Discord.MessageEmbed()
                .setThumbnail(member.user.displayAvatarURL({dynamic: true, size:512}))
                .setAuthor("Information about: " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .addField('**Username:**', `\`${member.user.username}#${member.user.discriminator}\``,true)
                .addField('**ID:**',`\`${member.id}\``,true)
                .addField('**Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({dynamic: true})})`,true)
                .addField('**Registered Date:**',`\`${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LT')}, ${moment(member.user.createdTimestamp).fromNow()} \``, true)
                .addField('**Date Joined Server:**',`\`${moment(member.joinedAt).format('LL LTS')}\``,true)
                .addField('**Flags:**',`\`${userflags.length ? userflags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
                .addField('**Status:**',`\`${member.presence ? status[member.presence?.status] : 'Offline'}\``,true)
                .addField('Devices Currently Using: ',`${Object.entries(devices).length}`)
                .addField('Currently On Device(s)', `\`${Object.entries(devices).length > 0 ? entries : 'None'}\``)
                .addField('**Game**:',`\`${member.presence.activities[0]?.name  || 'Not Currently Playing a Game.'}\``,true)
                .addField('**Highest Role:**',`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`,true)
                .addField(`\`${roles.length}\` **Roles:**`,`${getRoles(roles)}`)
                .setFooter({text:message.author.username, iconURL:message.author.displayAvatarURL({dynamic: true})})
                .setColor(accent_color)
                .setTimestamp()
    
    
                return message.channel.send({embeds:[embeduserinfo]});



          }


      })





        
    }
}
