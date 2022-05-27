const Schema = require("../../schemas/welcomeMessage");
const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setwelcome",
  description: "Sets a Welcome Message",
  permission: "ADMINISTRATOR",
  options: [
    {
      name:"welcomemessage",
      description:"The welcome message",
      type:"STRING",
      required:true
    },

    {
      name: "welcomechannel",
      description: "The channel that posts the message",
      type: "CHANNEL",
      required: true,
    },
    {
      name: "ruleschannel",
      description: "The channel where the rules is be posted",
      type: "CHANNEL",
      required: false,
    },
    {
      name: "roleschannel",
      description: "The channel to get react roles from",
      type: "CHANNEL",
      required: false,
    },
    {
      name: "moderatortag",
      description: "Mods to be tagged",
      type: "ROLE",
      required: false,
    },
    {
      name: "admintag",
      description: "Admins to be tagged",
      type: "ROLE",
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const channel = interaction.options.getChannel("welcomechannel");
    const rulesChannel = interaction.options.getChannel("ruleschannel");
    const rolesChannel = interaction.options.getChannel("roleschannel");
    const moderatorTag = interaction.options.getRole("moderatortag");
    const adminTag = interaction.options.getRole("admintag");
    const message = interaction.options.getString("STRING");

    await Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if(data) data.delete()
     
    new Schema({
          Guild: interaction.guild.id,
          Channel: channel.id,
          RulesChannel: rulesChannel.id ? rulesChannel.id : null,
          RolesChannel: rolesChannel.id ? rolesChannel.id : null,
          ModeratorTag: moderatorTag.id ? moderatorTag.id : null,
          AdminTag: adminTag.id ? adminTag.id : null,
          Message: message
    }).save()
    
     return interaction.followUp(`Welcome Message Set to ${channel}`);
    });
  },
};
