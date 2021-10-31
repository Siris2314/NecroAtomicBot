const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans users",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "target",
      description: "Select who you want to ban",
      type: "USER",
      required: true,
    },
    {
      name: "messages",
      description: `Delete banned user's messages`,
      type: "STRING",
      required: true,
      choices: [
        {
          name: "Delete None",
          value: "0",
        },
        {
          name: "Delete past 7 days",
          value: "7",
        },
      ],
    },
    {
      name: "reason",
      description: "Provide a reason for ban",
      type: "STRING",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    const Target = interaction.options.getMember("target");

    if (Target.id === interaction.user.id)
      return interaction.followUp({ content: "Cannot ban yourself" });

    if (
      interaction.member.roles.highest.position <= Target.roles.highest.position
    )
      return interaction.followUp({
        content:
          "You cannot ban people who are at the same role level or higher role level than you",
      });

    const Reason = interaction.options.getString("reason") || "No Reason";

    if (Reason.length > 512)
      return interaction.followUp({
        content: "Reason cannot exceed 512 characters",
      });

    Target.ban({ days: Amount, reason: Reason });

    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Member Banned")
      .setDescription(`✅ **${Target.user.username}** has been banned`);

    interaction.followUp({ embeds: [embed] });
  },
};
