const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {

    name:'slowmode',
    description: 'Enables slowmode in a channel',
    permission: 'MANAGE_CHANNELS',
    options:[

        {
        name:'time',
        description:'Time for slowmode(Set it to 0, to have no slowmode)',
        type:'STRING',
        require:'true'
        }
    ],

     /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

     run:async(client, interaction) => {

        const time = interaction.options.getString('time')

        if(time === '0'){
          interaction.channel.setRateLimitPerUser(0)
        }

        const milliseconds = ms(time)

        if(isNaN(milliseconds)) return interaction.followUp({content:'Not a valid time'}) 

        if(milliseconds < 1000) return interaction.followUp({content:'Min slowmode time is 1 second'})

        interaction.channel.setRateLimitPerUser(milliseconds / 1000)

        interaction.followUp({content:`The slowmode for this channel has been set to ${ms(milliseconds, {
          long: true,
        })}`})

        


     }

}