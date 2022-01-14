const warnModel = require("../../schemas/warn");
const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "warn",
  description: "advanced warning system",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "add",
      description: "add a warning to user",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "user to add warn",
          type: "USER",
          required: true,
        },
        {
          name: "reason",
          description: "reason to add",
          type: "STRING",
          required: false,
        },
      ],
    },
    {
      name: "check",
      description: "check your warnings or other",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "user to see warnings.",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "remove",
      description: "warn to remove",
      type: "SUB_COMMAND",
      options: [
        {
          name: "warnid",
          description: "warn id you want to remove",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    const option = interaction.options.getSubcommand();

    if (option === "add") {
      const member = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "No reason"; //define

      if (
        member.roles.highest.position >=
        interaction.guild.me.roles.highest.position
      )
        return interaction.followUp({
          content:
            "I cannot warn this user as their highest role is higher than mine or I have the same highest role as them.",
          ephemeral: true,
        });

      if (member.id === interaction.guild.ownerId)
        return interaction.followUp({
          content: "I cannot warn the owner of the server.",
          ephemeral: true,
        });

      if (member.id === interaction.user.id)
        return interaction.followUp({
          content: "You cannot warn yourself.",
          ephemeral: true,
        });

      if (member.id === interaction.guild.me.id)
        return interaction.followUp({
          content: "I cannot warn myself.",
          ephemeral: true,
        });

      if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
        return interaction.followUp(
          "You  Don't Have The Permission to use this command"
        );


      const embed1 = new MessageEmbed()
        .setDescription(
          `Are you sure you want to warn ${member.user.username}?`
        )
        .setColor("BLUE");
      const bcomponents = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("YES")
          .setLabel("Yes")
          .setStyle("SUCCESS"),

        new MessageButton().setCustomId("NO").setLabel("No").setStyle("DANGER")
      );
      const msg = await interaction.followUp({
        embeds: [embed1],
        components: [bcomponents],
        fetchReply: true,
      });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = msg.channel.createMessageComponentCollector({
        filter,
        time: 20000,
      });

      //answers
      const embed2 = new MessageEmbed()
        .setDescription(
          `✅ User has been warned\n\nUser: ${member.user.tag}\nModerator: ${interaction.user.tag}\nReason: \`${reason}\` `
        )
        .setColor("GREEN");

      const embed3 = new MessageEmbed()
        .setDescription(`❌ Action was canceled by ${interaction.user.tag}`)
        .setColor("RED");

      collector.on("collect", async (i) => {
        //collecter
        if (i.customId === "YES") {
          await interaction.editReply({ embeds: [embed2], components: [] });

          await new warnModel({
            userId: member.id,
            guildId: interaction.guildId,
            moderatorId: interaction.member.id,
            reason,
            timestamp: Date.now(),
          }).save();

          member.send(
            `You have been warned in ${interaction.guild.name} for ${reason}`
          );

          collector.stop("success");
        } else if (i.customId === "NO") {
          interaction.editReply({ embeds: [embed3], components: [] });
          collector.stop("success");
        }
      });
      const embed4 = new MessageEmbed()
        .setDescription("You took too much time! timed out")
        .setColor("RED");
      collector.on("end", async (ignore, error) => {
        if (error && error !== "success") {
          interaction.editReply({ embeds: [embed4], components: [] });
        }
        collector.stop("success");
      });
    } else if (option === "check") {
      const user = interaction.options.getUser("user") || interaction.user; //define
      const userWarnings = await warnModel.find({
        userId: user.id,
        guildId: interaction.guildId,
      }); //finds warnings

      const embedDescription = userWarnings
        .map((warn) => {
          const moderator = interaction.guild.members.cache.get(
            warn.moderatorId
          );

          return [
            //embed text
            `warnId: ${warn._id}`,
            `Moderator: ${moderator || "Has Left"}`,
            `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
            `Reason: ${warn.reason}`,
          ].join("\n");
        })
        .join("\n\n");
      const embed1 = new MessageEmbed()
        .setDescription(
          `Are you sure you want to view the warnings of ${user.tag}?`
        )
        .setColor("BLUE");
      const components = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("YES")
          .setLabel("Yes")
          .setStyle("SUCCESS"),

        new MessageButton().setCustomId("NO").setLabel("No").setStyle("DANGER")
      );
      const msg = await interaction.followUp({
        embeds: [embed1],
        components: [components],
        fetchReply: true,
      });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = msg.channel.createMessageComponentCollector({
        filter,
        time: 20000,
      });
      const embed2 = new MessageEmbed()
        .setTitle(`${user.tag}'s warnings`)
        .setDescription(embedDescription)
        .setColor("GREEN");

      const embed3 = new MessageEmbed()
        .setDescription(`❌ Action was canceled by ${interaction.user.tag}`)
        .setColor("RED");

      const embed5 = new MessageEmbed()
        .setTitle(`${user.tag}'s warnings`)
        .setDescription(`${user.tag} has no warnings in the server`)
        .setColor("PURPLE");

      collector.on("collect", async (i) => {
        if (i.customId === "YES") {
          interaction.editReply({ embeds: [embed2], components: [] });

          if (!userWarnings?.length)
            return interaction.editReply({
              embeds: [embed4],
              components: [],
            });
        } else if (i.customId === "NO") {
          interaction.editReply({ embeds: [embed3], components: [] });
          collector.stop("success");
        }
      });
      const embed4 = new MessageEmbed()
        .setDescription("You took too much time! timed out")
        .setColor("RED");
      collector.on("end", async (ignore, error) => {
        if (error && error !== "success") {
          interaction.editReply({ embeds: [embed4], components: [] });
        }
        collector.stop("success");
      });
    } else if (option === "remove") {
      const warnId = interaction.options.getString("warnid");

      const error1 = new MessageEmbed()
        .setTitle("Error")
        .setDescription("The warn id you have provided is invalid")
        .addField(`WarnId:`, `${warnId}`)
        .setColor("RED");

      try {
        const data = await warnModel.findById(warnId);
      } catch (e) {
        interaction.followUp({
          embeds: [error1],
        });
      }

      const data = await warnModel.findById(warnId);
      const user = interaction.guild.members.cache.get(data.userId);
      const embed1 = new MessageEmbed()
        .setDescription(
          `Are you sure you want to remove the warning of ${user}?`
        )
        .setColor("BLUE");
      const components = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("YES")
          .setLabel("Yes")
          .setStyle("SUCCESS"),

        new MessageButton().setCustomId("NO").setLabel("No").setStyle("DANGER")
      );
      const msg = await interaction.followUp({
        embeds: [embed1],
        components: [components],
        fetchReply: true,
      });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = msg.channel.createMessageComponentCollector({
        filter,
        time: 20000,
      });

      const embed2 = new MessageEmbed()
        .setDescription(
          `✅ User warn has been removed\n\nUser: ${user}\n\nWarn removed by: ${interaction.user.tag}`
        )
        .setColor("GREEN");

      const embed3 = new MessageEmbed()
        .setDescription(`❌ Action was canceled by ${interaction.user.tag}`)
        .setColor("RED");

      collector.on("collect", async (i) => {
        if (i.customId === "YES") {
          interaction.editReply({ embeds: [embed2], components: [] });
          const data = await warnModel.findById(warnId);
          data.delete();
          const user = interaction.guild.members.cache.get(data.userId);
          user.send(`Your 1 warning has been removed`);
          collector.stop("success");
        } else if (i.customId === "NO") {
          interaction.editReply({ embeds: [embed3], components: [] });
          collector.stop("success");
        }
      });
      const embed4 = new MessageEmbed()
        .setDescription("You took too much time! timed out")
        .setColor("RED");
      collector.on("end", async (ignore, error) => {
        if (error && error !== "success") {
          interaction.editReply({ embeds: [embed4], components: [] });
        }
        collector.stop("success");
      });
    }
  },
};
