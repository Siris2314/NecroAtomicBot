const { MessageEmbed } = require("discord.js");

const flags = {
	DISCORD_EMPLOYEE: '<:discordemployee:931530420800061530>',
	DISCORD_PARTNER: '<:discordpartner:929651430682402819>',
	BUGHUNTER_LEVEL_1: '<:discordbughunterlv1:929651431496118302>',
	BUGHUNTER_LEVEL_2: '<:discordbughunterlv2:929651431219298324>',
	HYPESQUAD_EVENTS: '<:discordhypesquad:929651430820810792>',
	HOUSE_BRAVERY: '<:discordbravery:929651430535606302>',
	HOUSE_BRILLIANCE: '<:discordbrillance:929651430682402816>',
	HOUSE_BALANCE: '<:discordbalance:929651431093448704>',
	EARLY_SUPPORTER: '<:discordearlysupporter:929651430523011133>',
	VERIFIED_BOT: '<:bottag:929651431613554728>',
	VERIFIED_DEVELOPER: '<:bot_developer:929650907665297408>'
};

module.exports = {
  name: "usercontext",
  type: "USER",
  run: async (client, interaction) => {
    const user = interaction.guild.members.cache.get(interaction.targetId);

    let badge = user.user.flags.toArray()
    let badges = badge.length ? badge.map(f => flags[f]).join(" ") : "No Badges";

    let status = user.presence?.status
    if (status === "dnd") status = client.emotes.Presence['dnd'];
    if (status === "idle") status = client.emotes.Presence['idle'];
    if (status === "online") status = client.emotes.Presence['online'];
    if (status === "offline" || status === "invisible" || status === undefined) status = client.emotes.Presence['offline']

    let activity = user.presence?.activities[0].name || "No Activity"

    let embed = new MessageEmbed()
      .setTitle(`${user.user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addField("User", `
      **Username:** ${user.user.username}
      **Tag:** ${user.user.tag}
      **Discriminator:** ${user.user.discriminator}
      **ID:** ${user.id}
      **Status:** ${status}
      **Activity:** ${activity}
      **Badges:** ${badges}
      **Created At:** <t:${parseInt(user.user.createdTimestamp / 1000)}:R>
      `)
      .addField("Server", `
      **Nickname:** ${user.displayName}
      **Joined At:** <t:${parseInt(user.joinedTimestamp / 1000)}:R>
      **Roles:** ${user.roles.cache.sort((a, b) => b.position - a.position).map((r) => r.toString()).slice(0, -1).join(" ")}
      `)
      .setColor("RANDOM")
      .setFooter({ text: `${new Date().toLocaleDateString()}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    return interaction.reply({ embeds: [embed] })
  },
};