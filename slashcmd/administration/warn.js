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
        const reason = interaction.options.getString("reason")

        if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.followUp({ content: "You cannot do this action due to having lower role hierarchy"})
        if (interaction.user.id === user.id) return interaction.followUp({ content: "Cannot warn yourself"})

        await Schema.findOne({Guild:interaction.guild.id}, async (err, data) => {
            if(!data){
             data = new Schema({
                 guildID: interaction.guild.id,
                 user: member.id,
                 content: [
                    {
                      moderator: interaction.user.id,
                      reason: reason || "No reason provided"
                    }
                  ]
             })   
                
            }
            else{

            const newwarn = {
                    moderator: interaction.user.id,
                    reason: reason || "No reason provided"
              }
              data.content.push(newwarn)
            }
            data.save();


        })

        interaction.channel.send({embeds:[new MessageEmbed() .setTitle('Member Warned') .setDescription(`${member.user.username} has been by ${interaction.user.username} for \n${reason}`)]})

    }




}