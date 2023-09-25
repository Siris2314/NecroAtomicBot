const { Client, CommandInteraction } = require("discord.js");
const Discord = require('discord.js');
module.exports = {
    name: 'bslap',
    description: 'Batman Slaps Robin.',
    options: [
    {
        name: "user",
        description: "mention that user",
        type: "USER",
        required: true
      },
      {
        name: "batman",
        description: "Need a reason to slap",
        type: "STRING",
        required: true
      },
      {
        name: "robin",
        description: "Reaction to slap. i.e: Bruh",
        type: "STRING",
        required: true
      }
],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
  run: async (client, interaction) => {
const user = interaction.options.getUser("user");
const robin = interaction.options.getString("robin");
const batman = interaction.options.getString("batman");
let member;
if(user) member = interaction.guild.members.cache.get(user.id);
const Embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setImage(encodeURI(`https://vacefron.nl/api/batmanslap?text1=${robin}&text2=${batman}&batman=${interaction.user.avatarURL({ format: "png" })}&robin=${member.user.displayAvatarURL({ format: "png" })}`))
.setFooter(`Requested by ${interaction.user.username}`)
.setTimestamp()

return interaction.followUp({embeds: [Embed]});
    }
}
