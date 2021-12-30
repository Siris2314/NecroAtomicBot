const { CommandInteraction, Client, MessageEmbed} = require('discord.js');
const ms = require('ms')
module.exports = {
    name: 'timeout',
    description: 'Timeout a user for a specified amount of time.',
    permission:'MUTE_MEMBERS',
    options:[
        {
            name: 'user',
            description: 'The user to timeout.',
            type:'USER',
            required: true
        },
        {
            name: 'time',
            description: 'The amount of time to timeout the user for, e.g.(1d, 1h, 1m, 1s.',
            type:'STRING',
            required: true
        },
        {
            name: "choice",
            description: "Turn on or off the timeout.",
            type: "STRING",
            required: true,
            choices: [
              {
                name: "on",
                value: "on",
              },
              {
                name: "off",
                value: "off",
              },
            ],
          },
          {
              name:'reason',
              description: 'The reason for the timeout.',
              type: 'STRING',
              required: false
          },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getMember('user');

        let args = interaction.options.data;
        let choice = args[1]?.value;

        let reason = interaction.options.getString('reason') || "No Reason"

        let timeout = interaction.options.getString('time');



        if(interaction.member.roles.highest.position <= user.roles.highest.position){
            return interaction.followUp(`${interaction.member}, you cannot timeout a user with the same or higher role than your own.`)
        }

        if(choice === 'on'){

            user.timeout(ms(timeout),reason);

            interaction.followUp(`${interaction.member}, you have timed out ${user} for ${timeout}`);

            const embed = new MessageEmbed()
                .setTitle('You have been timed out')
                .setDescription(`You have been timed out for ${timeout} for ${reason}, your time out will end at ${user.communicationDisabledUntil}`)
                .setTimestamp()
                .setColor('RED')

            user.send({embeds:[embed]})

        }
        else if(choice === 'off'){

            user.timeout(null);

            user.send(`Your timeout in ${interaction.guild.name} has expired`)

        }

       








    }
}