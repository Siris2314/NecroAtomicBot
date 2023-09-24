const {CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')

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
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const Target = interaction.options.getUser('target')

        const but = new MessageButton()
        .setStyle('LINK')
        .setLabel("PNG")

        .setURL( Target.displayAvatarURL({dynamic: true, format: "png", size: 4096}) )
          const but2 = new MessageButton()
        .setStyle('LINK')
        .setLabel("JPG")

        .setURL( Target.displayAvatarURL({dynamic: true, format: "jpg", size: 4096}) )
          const but3 = new MessageButton()
        .setStyle('LINK')
        .setLabel("WEBP")
        .setURL( Target.displayAvatarURL({dynamic: true, format: "webp", size: 4096 }) )

        const row = new MessageActionRow().addComponents(but, but2, but3)

        const res = new MessageEmbed()
            .setAuthor(`${Target.tag} Avatar`, Target.displayAvatarURL({dynamic:true}))
            .setImage(Target.displayAvatarURL({dynamic:true, size:4096}))
            .setColor("RANDOM")
            .setTimestamp()
            

        interaction.reply({embeds:[res], components: [row]})

    }

}
