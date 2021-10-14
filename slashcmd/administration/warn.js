const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/warn')

module.exports = {
    name: "warn",
    description: "Issues a warning to a member in the guild",
    permission:'ADMINISTRATOR',
    options: [{
      name: "member",
      description: "Input the member to warn",
      type: "USER",
      required: true,
    }, {
      name: "reason",
      description: "Input a reason for the warning",
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
        const member = interaction.options.getMember("member")
        const reason = interaction.options.getString("reason") || "No Reason"

        if (interaction.user.id === member.id) return interaction.followUp({ content: "Cannot warn yourself"})
        if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.followUp({ content: "You cannot do this action due to having lower role hierarchy"})

        new Schema({
          userId: member.id,
          guildID:interaction.guild.id,
          moderatorId:interaction.user.id,
          reason:reason, 
          timestamp:Date.now()


        }).save()

        console.log(interaction.guild.id);


        const sendEmbed = new MessageEmbed()
          .setTitle(`You have been warned in **${interaction.guild.name}**`)
          .setDescription(`You have been warned by ${interaction.username} for ${reason}`)

        member.send({embeds:[sendEmbed]})

        interaction.followUp({embeds:[new MessageEmbed() .setTitle('Member Warned') .setDescription(`${member.user.username} has been by ${interaction.user.username} for \n${reason}`) .setColor()]})

    }




}