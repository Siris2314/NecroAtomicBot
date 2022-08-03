const { DiscordTogether } = require('discord-together');
const {MessageEmbed, CommandInteraction, Client} = require('discord.js')

module.exports = {
    name: 'games',
    description:'Discord Together Games',
    options: [
        {
            name: "choice",
            description: "Game Choice",
            type: "STRING",
            required: true,
            choices: [
              {
                name: "Youtube",
                value: "youtube",
              },
              {
                name: "Poker",
                value: "poker",
              },
              {
                name: "Chess",
                value: "chess",
              },
              {
                name:'Doodle Crew',
                value:'doodlecrew'
              }
            ],
          },
    ],


    run: async (client, interaction) => {

        let args = interaction.options.data;
        let choice = String(args[0]?.value);

        console.log(choice)

        if(!interaction.member.voice.channel){
            return interaction.followUp('Must be in VC to use this command')
        }
        client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, choice).then(async invite => {
            return interaction.followUp(`${invite.code}`)

        })


    }
}