const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'flip',
    description: 'Flips A Coin',
    category: "fun",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
            let ht = ['Heads',
          'Tails'
          ];
          const embed = new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`It's **${ht}**`)
        interaction.reply({embeds: [embed]})
    }
  }
