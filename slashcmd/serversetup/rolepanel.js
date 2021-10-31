const Schema = require("../../schemas/reactionRoles");
const {
  CommandInteraction,
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "rolepanel",
  description: "Displays a panel of role reaction",
  permissions: "MANAGE_ROLES",

  run: async (client, interaction) => {
    Schema.findOne({ guildId: interaction.guildId }, async(err,data) => {

    if (!data?.roles) {
      return interaction.followUp({
        content: "Role Reaction has not been setup in this server",
      });
    }

    const options = data.roles.map((x) => {
      const role = interaction.guild.roles.cache.get(x.roleId);

      return {
        label: role.name,
        value: role.id,
        description: x.description,
        emoji: x.emoji,
      };
    });

    const panel = new MessageEmbed()
      .setTitle("Please Select A Role")
      .setColor("RED");

    const components = [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("reaction-roles")
          .setMaxValues(1)
          .addOptions(options)
      ),
    ];


    interaction.followUp({embeds:[panel], components})

        
        
    });



   
  },
};
