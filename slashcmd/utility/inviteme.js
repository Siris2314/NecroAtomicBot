const { Client, Interaction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


const env = {
  SUPPORT_SERVER_ON: true,
  SUPPORT_SERVER: "https://discord.gg/nN3KQxt5Xr", 
  permissions: ["ADMINISTRATOR"],
  scopes: ["applications.commands", "bot"] 
}

module.exports = {
  name: "inviteme",
  description: "Get Links To Invite Me",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
   run: async (client, interaction) => {
    try {
      let embed = new MessageEmbed().setColor("WHITE");

      
      let row = new MessageActionRow().addComponents(
       
        new MessageButton()
            .setLabel("Invite Me!")
            .setURL(client.generateInvite({ scopes: env.scopes, permissions: env.permissions }))
            .setStyle("LINK"),
      );
      
      if(env.SUPPORT_SERVER_ON){
          row.addComponents(
              new MessageButton()
               .setLabel("Support Server")
               .setStyle("LINK")
               .setURL(env.SUPPORT_SERVER)

               
          )
      }
      embed.setDescription(`Take Your Links`);
      
      await interaction.followUp({ embeds: [embed], components: [row] });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};