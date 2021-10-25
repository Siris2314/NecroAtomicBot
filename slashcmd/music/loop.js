const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports =  {
    name:'loop',
    description:'Loops Song/Queue',
    options:[
        {
            name:'choice',
            description:'Loop Choice(Single Song/Queue)',
            type:'STRING',
            required:true,
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
        const choice = args[0]?.value

        console.log(choice);

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        queue.setRepeatMode(Number(choice))

      if(choice == 0){
        interaction.followUp({content:`Repeat Mode set to off`})
      }
      else if(choice == 1){
          interaction.followUp({content:`Repeat Mode set to Song`})
      }
      else if(choice  == 2){
        interaction.followUp({content:`Repeat Mode set to Queue`})

      }


    }
}