const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const Schema = require("../../schemas/mute");
module.exports = {
  name: "mute",
  description: "mutes users",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "target",
      description: "Select who you want to mute",
      type: "USER",
      required: true,
    },

    {
      name: "reason",
      description: "Provide reason to mute",
      type: "STRING",
      required: false,
    },
    {
      name: "preset-time",
      description: "Select from a preset time",
      type: "STRING",
      required: false,
      choices: [
        {
          name: "1 Hour",
          value: "1h",
        },
        {
          name: "1 Day",
          value: "1d",
        },
        {
          name: "5 Seconds",
          value: "5s",
        },
      ],
    },
    {
      name: "custom-time",
      description: "Provide from a custom time (1s/1h/1d)",
      type: "STRING",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */

  run: async (client, interaction) => {
    const Target = interaction.options.getMember("target");
    const Reason = interaction.options.getString("reason") || "No Reason";
    const Time =
      interaction.options.getString("custom-time") ||
      interaction.options.getString("preset-time") ||
      "Forever";
    const role = interaction.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );
    if (
      interaction.member.roles.highest.position <= Target.roles.highest.position
    )
      return interaction.followUp({
        content:
          "You cannot mute people who are at the same role level or higher role level than you",
      });
    if (!role) {
      try {
        interaction.followUp({
          content: "Muted role is not found, attempting to create muted role.",
        });

        let muterole = await interaction.guild.roles.create({
          data: {
            name: "muted",
            permissions: [],
          },
        });
        interaction.guild.channels.cache
          .filter((c) => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
        interaction.followUp({
          content: "Muted role has sucessfully been created.",
        });
      } catch (error) {
        console.log(error);
      }
    }

    let role2 = interaction.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted"
    );
    if (Target.roles.cache.has(role2.id))
      return interaction.followUp({
        content: `${Target.displayName} has already been muted.`,
      });
    await Target.roles.add(role2);

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (!data) {
        new Schema({
          Guild: interaction.guild.id,
          Users: Target.id,
        }).save();
      } else {
        data.Users.push(Target.id);
        data.save();
      }
    });

    const embed = new MessageEmbed()
      .setTitle("Member Muted")
      .setDescription(
        `✅ ${Target.user.username} has been muted for ${Reason}, duration of mute ${Time}`
      )
      .setColor("RED")
      .setTimestamp();

    interaction.followUp({ embeds: [embed] });
  },
};
