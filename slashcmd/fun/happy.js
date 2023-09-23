const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "happy",
  category: "Fun",
  description: "Sometimes you are very happy ",
  /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
   run: async (client, interaction) => {
    const getGif = async () => {
      const response = await axios.get(
        "https://anime-reactions.uzairashraf.dev/api/reactions",
        {
          params: {
            category: "happy",
          },
        }
      );
      return response.data;
    };
    const reactions = await getGif();
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    const embed = new MessageEmbed()
        .setImage(reaction)
        .setTitle(`${interaction.user.username} is happy!`)
        .setTimestamp();
        interaction.reply({embeds: [embed]});
  },
};
