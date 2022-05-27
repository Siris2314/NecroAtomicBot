const {MessageEmbed, CommandInteraction, Client, MessageAttachment} = require('discord.js')
const petPetGif = require('pet-pet-gif')

module.exports = {
    name:'petpet',
    description:'Pet a picture',
    options:[
        {
        name:'target',
        description:'Select whose profile pic you want to see',
        type:'USER',
        required:true
        }

    ],

    run: async (client, interaction) => {

        const Target = interaction.options.getUser('target') 

        let animatedGif = await petPetGif(Target.displayAvatarURL({format:'png'}))

        const image = new MessageAttachment(animatedGif, 'petpet.gif')

        interaction.followUp({files:[image]})

        
    }
}