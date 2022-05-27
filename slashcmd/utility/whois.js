const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
require('dotenv').config()
const token = process.env.token
const axios = require('axios')
const moment = require('moment');
const fetch = require('node-fetch')
module.exports = {
    name:'whois',
    description: 'Userinfo Command',
    options: [

        {

            name:'target',
            description:'Select whose userinfo you want to see',
            type:'USER',
            required:true


        }



    ],

    run: async (client, interaction) => {

        const statuses = {
            online: "Online",
            offline: "Offline",
            dnd: "DND",
            idle: "Idle",
          };
          

        const badges = {
            DISCORD_EMPLOYEE: `<:staff_badge:915024656250044457>`,
            PARTNERED_SERVER_OWNER: `<:partner_badge:915024655641886790>`,
            BUGHUNTER_LEVEL_1: `<:discord_bug_hunter_lv1:915024656224886834>`,
            BUGHUNTER_LEVEL_2: `<:discord_bug_hunter_lv2:915024656346521620>`,
            HYPESQUAD_EVENTS: `<:badge_hypesquad:915024655776096307>`,
            HOUSE_BRAVERY: `<:hypesquad_bravery:915024656224911360>`,
            HOUSE_BRILLIANCE: `<:hypesquad_briliance:915024655880970281>`,
            HOUSE_BALANCE: `<:hypesquad_balance:915024656245878816>`,
            EARLY_SUPPORTER: `<:discord_early_supporter:915024655998402590`,
            TEAM_USER: `Team User`,
            SYSTEM: `<:verified_system:915024655859990568>`,
            VERIFIED_BOT: `<:bot_tag:915024656510119936>`,
            EARLY_VERIFIED_BOT_DEVELOPER: `<:bot_developpeur_verifie:915024656052924536>`,
            NITRO: "<:nitroclassic:974686101799329832>",
            BOOSTER_1: "<:serverbooster1:974686102000640060>",
            BOOSTER_2: "<:serverbooster2:974686102042574929>",
            BOOSTER_3: "<:serverbooster3:974686102071951390>",
            BOOSTER_4: "<:serverbooster4:974686102017425428>",
            BOOSTER_5: "<:serverbooster5:974686102126485554>",
            BOOSTER_6: "<:serverbooster6:974686102046797854>",
            BOOSTER_7: "<:serverbooster7:974686102063566898>",
            BOOSTER_8: "<:serverbooster8:974686101946138674>",
            BOOSTER_9: "<:serverbooster9:974686101933539358>",
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

        let user = interaction.options.getUser('target', false);
        if (!user) user = interaction.user;
        let member = await interaction.guild.members.fetch(user.id).catch(() => {});


        let UserBadges = "";

        const response = await fetch(
            `https://japi.rest/discord/v1/user/${user.id}`
          );
          const data = await response.json();


        let status = member.presence?.status;
        if (status === "dnd" || status === "idle" || status === "online")
          status = statuses[status];
        else if (
          status === "invisible" ||
          status === "offline" ||
          status === undefined
        )
          status = statuses["offline"];

          if(data.data.public_flags_array.length == 0){
              UserBadges = "No Badges"
          }else{
            UserBadges = data.data.public_flags_array
            ? data.data.public_flags_array.map((flag) => badges[flag]).join(" ")
            : "No Badges.";
          }






        


        

    

        const roles = member.roles.cache 
            .sort((a,b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0,-1)






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
            url = `https://cdn.discordapp.com/banners/${member.user.id}/${banner}${extension}?size=1024`

        const devices = member.presence?.clientStatus  || {};

        const entries = Object.entries(devices)
            .map((value,index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`)
            .join("\n");
        
        const embeduserinfo = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size:512}))
            .setAuthor({name:"Information about: " + member.user.username + "#" + member.user.discriminator})
            .setColor("RANDOM")
            .addField('**Username:**', `\`${member.user.username}#${member.user.discriminator}\``,true)
            .addField('**ID:**',`\`${member.id}\``,true)
            .addField('**Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({dynamic: true})})`,true)
            .addField('**Registered Date:**',`\`${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LT')}, ${moment(member.user.createdTimestamp).fromNow()} \``, true)
            .addField('**Date Joined Server:**',`\`${moment(member.joinedAt).format('LL LTS')}\``,true)
            .addField('**Flags:**',UserBadges, true)
            .addField('**Status:**',`\`${status}\``,true)
            .addField('Devices Currently Using: ',`${Object.entries(devices).length}`)
            .addField('Currently On Device', `\`${Object.entries(devices).length > 0 ? entries : 'None'}\``)
            .addField('**Game**:',`\`${member.presence?.activities[0] ? member.presence?.activities[0].name : 'Not Currently Playing a Game.'}\``,true)
            .addField('**Highest Role:**',`${member.roles.highest.id === interaction.guild.id ? 'None' : member.roles.highest}`,true)
            .addField(`\`${roles.length}\` **Roles:**`,`${getRoles(roles)}`)
            .setColor("RANDOM")
            .setImage(url)
            .setTimestamp()


            return interaction.followUp({embeds:[embeduserinfo]})
          }
          else{           

            const devices = member.presence?.clientStatus  || {};

            const entries = Object.entries(devices)
                .map((value,index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`)
                .join("\n");
            const embeduserinfo = new MessageEmbed()
                .setThumbnail(member.user.displayAvatarURL({dynamic: true, size:512}))
                .setAuthor({name:"Information about: " + member.user.username + "#" + member.user.discriminator}, {iconURL: member.user.displayAvatarURL({dynamic: true})})
                .setColor("RANDOM")
                .addField('**Username:**', `\`${member.user.username}#${member.user.discriminator}\``,true)
                .addField('**ID:**',`\`${member.id}\``,true)
                .addField('**Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({dynamic: true})})`,true)
                .addField('**Registered Date:**',`\`${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LT')}, ${moment(member.user.createdTimestamp).fromNow()} \``, true)
                .addField('**Date Joined Server:**',`\`${moment(member.joinedAt).format('LL LTS')}\``,true)
                .addField('**Flags:**',UserBadges, true)
                .addField('**Status:**',`\`${status}\``,true)
                .addField('Devices Currently Using: ',`${Object.entries(devices).length}`)
                .addField('Currently On Device(s)', `\`${Object.entries(devices).length > 0 ? entries : 'None'}\``)
                .addField('**Game**:',`\`${member.presence?.activities[0] ? member.presence?.activities[0].name : 'Not Currently Playing a Game.'}\``,true)
                .addField('**Highest Role:**',`${member.roles.highest.id === interaction.guild.id ? 'None' : member.roles.highest}`,true)
                .addField(`\`${roles.length}\` **Roles:**`,`${getRoles(roles)}`)
                .setColor(accent_color)
                .setTimestamp()
    
    
                return interaction.followUp({embeds:[embeduserinfo]})



          }


      })


    }


}

