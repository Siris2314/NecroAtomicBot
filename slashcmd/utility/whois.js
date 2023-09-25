const { Client, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const moment = require('moment');
const Discord = require('discord.js');
module.exports = {

    name: 'whois',
    description: 'Shows Userinfo',
    options: [
  {
    name: "user",
    description: "Mention that user",
    type: "USER",
    required: false
  }
],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
  run: async (client, interaction) => {
   
        const permissions = {
            "ADMINISTRATOR": "\`Administrator\`",
            "MANAGE_GUILD": "\`Manage Server\`",
            "MANAGE_ROLES": "\`Manage Roles\`",
            "MANAGE_CHANNELS": "\`Manage Channels\`",
            "KICK_MEMBERS": "\`Kick Members\`",
            "BAN_MEMBERS": "\`Ban Members\`",
            "MANAGE_NICKNAMES": "\`Manage Nicknames\`",
            "MANAGE_EMOJIS": "\`Manage Emojis\`",
            "MANAGE_WEBHOOKS": "\`Manage Webhooks\`",
            "MANAGE_MESSAGES": "\`Manage Messages\`",
            "MENTION_EVERYONE": "\`Mention Everyone\`"
        }
        const user = interaction.options.getUser("user");
        let member;
        if(user) member = interaction.guild.members.cache.get(user.id);
        else member = interaction.member;
        const nick = member.nickname === null ? "None" : member.nickname;
        const roles = member.roles.cache.get === "" ? "None" : member.roles.cache.get;
          const usericon = member.user.avatarURL;
        const mentionPermissions = member.permissions.toArray() === null ? "None" : member.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        const devices = member.presence?.clientStatus || {};

        const entries = Object.entries(devices)
          .map(
            (value, index) =>
              `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`
          )
          .join(", ");

        const response = await fetch(
          `https://japi.rest/discord/v1/user/${member.user.id}`
        );
        const data = await response.json();
        const badges = {
          DISCORD_EMPLOYEE: `Discord Employee`,
          PARTNERED_SERVER_OWNER: `Partnered Server Owner`,
          BUGHUNTER_LEVEL_1: `Bug Hunter Level 1`,
          BUGHUNTER_LEVEL_2: `Bug Hunter Level 2`,
          HYPESQUAD_EVENTS: `HypeSquad Events`,
          HOUSE_BRAVERY: `House Bravery`,
          HOUSE_BRILLIANCE: `House Brilliance`,
          HOUSE_BALANCE: `House Balance`,
          EARLY_SUPPORTER: `Early Suppoter`,
          TEAM_USER: `Team User`,
          SYSTEM: `Sytem`,
          VERIFIED_BOT: `Verified`,
          EARLY_VERIFIED_BOT_DEVELOPER: `Early Verified Bot Developer`,
          NITRO: "Nitro",
          ACTIVE_DEVELOPER: `Active Developer`,
        };
        let UserBadges = "";    
        if (data.data.public_flags_array.length == 0) {
          UserBadges = "No Badges";
        } else {
          UserBadges = data.data.public_flags_array
            ? data.data.public_flags_array.map((flag) => badges[flag]).join(" ")
            : "No Badges.";
        }
    
        var bot = {
            "true": "Bot",
            "false": "User"
        };

 let link = `https://discord.com/users/${member.user.id}`
   const row = new MessageActionRow().addComponents( new MessageButton().setEmoji("🔎").setStyle("LINK").setURL(link),  new MessageButton().setStyle('LINK').setURL(member.user.displayAvatarURL({ dynamic: true })).setEmoji("🖼"))

   let status = {
    online: " :green_circle: \`Online\`",
    idle: " :orange_circle: \`Idle\`",
    dnd: ":red_circle: \`Do Not Disturb\`",
    offline: ":black_circle: \`Offline\`"
  };


  let userStatus;
if (member.presence === null) { 

  userStatus = ':black_circle: \`Offline\`'
  const whois = new Discord.MessageEmbed()
  .setAuthor({ name:`User Info`, iconURL: member.user.avatarURL()})
  .setThumbnail(usericon)
  .addField(`General Info`, `> Name: \`${member.user.username}\` \n > Id:\`${member.user.id}\` \n> Tag: \`${member.user.discriminator}\` \n> Nickname: \`${nick}\` \n > Status: ${userStatus}\n > Activity: \`None\``, true)
  .addField(`Overview`, `> Badges: ${UserBadges}\n> User: ${bot[member.user.bot]}`)
  .addField("Devices Currently Using: ",`\`${Object.entries(devices).length}\``)
  .addField("Currently On", `\`${Object.entries(devices).length > 0 ? entries : "None"}\``)
  .addField(`Roles:`,`> <@&${member._roles.join(">  <@&")}>`)
  .addField(`Permissions:`, `${finalPermissions.join(', ')}`|| " \`No Permissions\`")
  .addField(`Misc Info`, `> Acc Created on: \n> \`${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \n> Joined This Server on: \n> \`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
  .setThumbnail(member.user.avatarURL())
  .setFooter(`ID: ${member.user.id}`, member.user.avatarURL())
  .setTimestamp()
  .setColor(member.displayHexColor);

  if (member.communicationDisabledUntilTimestamp) {
    whois.addField("Timeout Left:", `> \`${member.communicationDisabledUntil.toLocaleString()}\` **<t:${Math.floor(member.communicationDisabledUntilTimestamp / 1000)}:R>**`)
}
  interaction.reply({ embeds: [whois], components: [row] })

} else {
status1 = status[member.presence.status]

const pre = member.presence.activities.join(", ");
if(!pre) {
  let pre = "None" 

  const whois = new Discord.MessageEmbed()
  .setAuthor({ name:`User Info`, iconURL: member.user.avatarURL()})
  .setThumbnail(usericon)
  .addField(`General Info`, `> Name: \`${member.user.username}\`\n > Id:\`${member.user.id}\` \n> Tag: \`${member.user.discriminator}\` \n> Nickname: \`${nick}\` \n > Status: ${status1} \n > Activity: \`${pre}\``, true)
  .addField(`Overview`, `> Badges: ${UserBadges}\n> User: ${bot[member.user.bot]}`)
  .addField("Devices Currently Using: ",`${Object.entries(devices).length}`)
  .addField("Currently On", `\`${Object.entries(devices).length > 0 ? entries : "None"}\``)
  .addField(`Roles:`,`> <@&${member._roles.join(">  <@&")}>`)
  .addField(`Permissions:`, `${finalPermissions.join(', ')}`|| "\`No Permissions\`")
  .addField(`Misc Info`, `> Acc Created on: \n> \`${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \n> Joined This Server on: \n> \`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
  .setThumbnail(member.user.avatarURL())
  .setFooter(`ID: ${member.user.id}`, member.user.avatarURL())
  .setTimestamp()
  .setColor(member.displayHexColor);


  if (member.communicationDisabledUntilTimestamp) {
    whois.addField("Timeout Left:", `> \`${member.communicationDisabledUntil.toLocaleString()}\` **<t:${Math.floor(member.communicationDisabledUntilTimestamp / 1000)}:R>**`)
}
  interaction.reply({ embeds: [whois], components: [row] })
} else {  
  const whois = new Discord.MessageEmbed()
  .setAuthor({ name:`User Info`, iconURL: member.user.avatarURL()})
  .setThumbnail(usericon)
  .addField(`General Info`, `> Name: \`${member.user.username}\`\n > Id:\`${member.user.id}\` \n> Tag: \`${member.user.discriminator}\` \n> Nickname: \`${nick}\` \n > Status: ${status1} \n > Activity: \`${pre}\``, true)
  .addField(`Overview`, `> Badges: ${UserBadges}\n> User: ${bot[member.user.bot]}`)
  .addField("Devices Currently Using: ",`${Object.entries(devices).length}`)
  .addField("Currently On)", `\`${Object.entries(devices).length > 0 ? entries : "None"}\``)
  .addField(`Roles:`,`> <@&${member._roles.join(">  <@&")}>`)
  .addField(`Permissions:`, `${finalPermissions.join(', ')}`|| "\`No Permissions\`")
  .addField(`Misc Info`, `> Acc Created on: \n> \`${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \n> Joined This Server on: \n> \`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
  .setThumbnail(member.user.avatarURL())
  .setFooter(`ID: ${member.user.id}`, member.user.avatarURL())
  .setTimestamp()
  .setColor(member.displayHexColor);


  if (member.communicationDisabledUntilTimestamp) {
    whois.addField("Timeout Left:", `> \`${member.communicationDisabledUntil.toLocaleString()}\` **<t:${Math.floor(member.communicationDisabledUntilTimestamp / 1000)}:R>**`)
}
interaction.reply({ embeds: [whois], components: [row] })
    }
  } 
 } 
}
