const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name:'avatar',
    description: 'Avatar Slash Command',
    options: [

        {

            name:'target',
            description:'Select whose profile pic you want to see',
            type:'USER',
            required:true


        }



    ],

    run: async (client, interaction) => {
        const Target = interaction.options.getUser('target')

        const res = new MessageEmbed()
            .setAuthor(`${Target.tag} Avatar`, Target.displayAvatarURL({dynamic:true}))
            .setImage(Target.displayAvatarURL({dynamic:true, size:4096}))
            .setColor("RANDOM")
            .setTimestamp()
            

        interaction.followUp({embeds:[res]})

    }

}