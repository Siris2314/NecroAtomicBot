const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'loop',
    description:'Loops Song/Queue',
    options:[
        {
            name:'choice',
            description:'Loop Choice(Single Song/Queue)',
            type:'STRING',
            choices:[
                {
                    name:'off',
                    value:'0',
                    
                },
                {
                    name:'song',
                    value:'1'
                },
                {

                    name:'queue',
                    value:'2'

                }
            ]

        }
    ],
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        const args = interaction.options.data
        const name = args[1]?.value
        const choice = args[1]?.value

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        queue.setRepeatMode(Number(choice))


        interaction.followUp({content:`Repeat Mode set to ${name}`})


    }
}