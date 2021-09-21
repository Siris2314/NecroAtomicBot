const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
module.exports = {
  name: "embedbuilder",
  description: "create a embed a command in a certain channel. supports embed!",
  permission:'MANAGE_MESSAGES',
  options: [
    {
      name: "channel",
      description: "What channel do you want your embed to be in?",
      type: "CHANNEL",
      required: true,
    },
    {
      name: "title",
      description: "What title do you want for the embed?",
      type:'STRING',
      required:true
    },
    {
      name: "color",
      description: "Thats's a nice title! now what color do you want?",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "Random",
          value: "RANDOM"
        },
        {
          name: "Red",
          value: "RED"
        },
        {
          name: "Aqua",
          value: "AQUA"
        },
        {
          name: "Dark Aqua",
          value: "DARK_AQUA"
        },
        {
          name: "Green",
          value: "GREEN"
        },
        {
          name: "Dark Green",
          value: "DARK_GREEN"
        },
        {
          name: "Blue",
          value: "BLUE"
        },
        {
          name: "Dark Blue",
          value: "DARK_BLUE"
        },
        {
          name: "Purple",
          value: "PURPLE"
        },
        {
          name: "Dark Purple",
          value: "DARK_PURPLE"
        },
        {
            name: "Luminous Vivid Pink",
            value: "LUMINOUS_VIVID_PINK"
        },
        {
            name: "Dark Vivid Pink",
            value: "DARK_VIVID_PINK"
        },
        {
            name: "Gold",
            value: "GOLD"
        },
        {
            name: "Dark Gold",
            value: "DARK_GOLD"
        },
        {
            name: "Orange",
            value: "ORANGE"
        },
        {
            name: "Dark Orange",
            value: "DARK_ORANGE"
        },
        {
            name: "Dark Red",
            value: "DARK_RED"
        },
        {
            name: "Grey",
            value: "GREY"
        },
        {
            name: "Dark Grey",
            value: "DARK_GREY"
        },
        {
            name: "Darker Grey",
            value: "DARKER_GREY"
        },
        {
            name: "Light Grey",
            value: "LIGHT_GREY"
        },
        {
            name: "Navy",
            value: "NAVY"
        },
        {
            name: "Dark Navy",
            value: "DARK_NAVY"
        },
        {
            name: "Yellow",
            value: "YELLOW"
        },
        {
            name: "White",
            value: "WHITE"
        }
        ]
      },
      {
        name: "description",
        description: "now what do you want the description to be?",
        type: "STRING",
        required: true
      },
      {
        name: "footer",
        description: "Now, what do you want the footer to be?",
        type: "STRING",
        required: true
      },
      {
        name: "timestamp",
        description:"Do you want a timestamp? Type \\`yes\\` if you do, and type \\`no\\` if you don't.",
        type: "STRING",
        required: true,
        choices: [
          {
            name: "Yes",
            value: "yes"
          },
          {
            name: "No",
            value: "no"
          }
        ]
      },
      {
        name: "thumbnails",
        description: "Now you use the thumbnails otherwise just leave it",
        type: "STRING",
        required: false
      },
      {
        name: "image",
        description: "Now you use the image otherwise just leave it",
        type: "STRING",
        required: false
      }
     ],

     run: async (client, interaction) => {
        const title = interaction.options.getString("title");
        const channel = interaction.options.getChannel("channel");
        const description = interaction.options.getString("description");
        const color = interaction.options.getString("color");
        const footer = interaction.options.getString("footer");
        const timesm = interaction.options.getString("timestamp");
        const image = interaction.options.getString("image");
        const thumbnails = interaction.options.getString("thumbnails");
    
        if (timesm === "yes") {
          await interaction.followUp({
            ephemeral: true,
            embeds: [
              new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`DONE!`)
                .setDescription(
                  `There will be a timestamp. The embed has been sent in <#${channel.id}>.`
                )
            ]
          });
    
          const embed2 = new MessageEmbed()
            .setTitle(title)
            .setColor(color)
            .setDescription(description)
            .setFooter(footer)
            .setImage(image)
            .setThumbnail(thumbnails)
            .setTimestamp();
          interaction.guild.channels.cache
            .get(channel.id)
            .send({ embeds: [embed2] });
        } else if (timesm === "no") {
          await interaction.followUp({
            ephemeral: true,
            embeds: [
              new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`DONE!`)
                .setDescription(
                  `There will be no timestamp. The embed has been sent in <#${channel.id}>.`
                )
            ]
          });
          const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(color)
            .setDescription(description)
            .setImage(image)
            .setThumbnail(thumbnails)
            .setFooter(footer);
          interaction.guild.channels.cache
            .get(channel.id)
            .send({ embeds: [embed] });
        }
     }

}