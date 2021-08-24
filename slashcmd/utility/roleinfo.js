const { CommandInteracion, Client, MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "roleinfo",
  description: "Get information of a role",
  options: [
    {
      name: "role",
      type: "ROLE",
      description: "Role Info with permissions",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */
  run: async (client, interaction) => {
    

    const role = interaction.options.getRole('role')
    const position = `\`${
      interaction.guild.roles.cache.size - role.position
    }\`/\`${interaction.guild.roles.cache.size}\``;
    const embed = new MessageEmbed()
      .setTimestamp()
      .setAuthor(
        `${interaction.member.user.nickname}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("Role Info")
      .setColor(role.color)
      .addFields(
        {
          name: "ID",
          value: role.id,
        },
        {
          name: "Name",
          value: role.name,
          inline: true,
        },
        {
          name: "Color",
          value: role.hexColor,
          inline: true,
        },
        {
          name: "Position",
          value: position,
          inline: true,
        },
        {
          name: `Hoisted`,
          value: `${role.hoist ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Mentionable",
          value: `${role.mentionable ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Bot Role",
          value: `${role.managed ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Creation Date",
          value: `\`${moment(role.createdAt).format("DD/MMM/YYYY")}\``,
          inline: true,
        },
        {
          name: "Permissions",
          value: permission(role.permissions.toArray()),
          inline: true,
        }
      );
    await interaction.followUp({ embeds: [embed] });
  },
};








function permission(arr) {
    const permissions = {
      ADMINISTRATOR: "Administrator",
      VIEW_AUDIT_LOG: "View Audit Log",
      VIEW_GUILD_INSIGHTS: "View Server Insights",
      MANAGE_GUILD: "Manage Server",
      MANAGE_ROLES: "Manage Roles",
      MANAGE_CHANNELS: "Manage Channels",
      KICK_MEMBERS: "Kick Members",
      BAN_MEMBERS: "Ban Members",
      CREATE_INSTANT_INVITE: "Create Invite",
      CHANGE_NICKNAME: "Change Nickname",
      MANAGE_NICKNAMES: "Manage Nicknames",
      MANAGE_EMOJIS_AND_STICKERS: "Manage Emojis and Stickers",
      MANAGE_WEBHOOKS: "Manage Webhooks",
      VIEW_CHANNEL: "Read Text Channels & See Voice Channels",
      SEND_MESSAGES: "Send Messages",
      SEND_TTS_MESSAGES: "Send TTS Messages",
      MANAGE_MESSAGES: "Manage Messages",
      EMBED_LINKS: "Embed Links",
      ATTACH_FILES: "Attach Files",
      READ_MESSAGE_HISTORY: "Read Message History",
      MENTION_EVERYONE: "Mention @everyone, @here, and All Roles",
      USE_EXTERNAL_EMOJIS: "Use External Emojis",
      ADD_REACTIONS: "Add Reactions",
      CONNECT: "Connect",
      SPEAK: "Speak",
      STREAM: "Video",
      MUTE_MEMBERS: "Mute Members",
      DEAFEN_MEMBERS: "Deafen Members",
      MOVE_MEMBERS: "Move Members",
      USE_VAD: "Use Voice Activity",
      PRIORITY_SPEAKER: "Priority Speaker",
      REQUEST_TO_SPEAK: "Request to Speak",
      MANAGE_THREADS: "Manage Threads",
      USE_PUBLIC_THREADS: "Use Public Threads",
      USE_PRIVATE_THREADS: "Use Private Threads",
      USE_EXTERNAL_STICKERS: "Use External Stickers",
      USE_APPLICATION_COMMANDS: "Use Application Commands",
    };
    const rolePermissions = arr;
    const finalPermissions = [];
    for (const perm in permissions) {
      if (rolePermissions.includes(perm)){
        finalPermissions.push(`✅ ${permissions[perm]}`);
      }else {
          finalPermissions.push(`❌ ${permissions[perm]}`)
          
      }
    }
    return `${`\`\`\`diff\n${finalPermissions.join("\n")}\`\`\``}`;
  }