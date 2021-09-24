const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/warn')
const wrapper = require('popcat-wrapper')

module.exports = {
    name:'url',
    description:'Shortens URL',
    options:[
        {
            name:'url',
            description:'URL to Shorten',
            type:'STRING',
            required:true,
        },
        {
            name:'extension',
            description:'Extension for your url: for example www.hello.com/your extension',
            type:'STRING',
            required:true,
        }
    ],

    run:async(client, interaction) => {



      try{
        const url = interaction.options.getString('url')
        const extension = interaction.options.getString('url')
        const newurl = wrapper.shorten(url, extension)

        interaction.followUp({content:`Shortened URL: ${newurl}`})

      } catch(err) {
        interaction.followUp({content:`An error occurred: ${err}`})
      }


    }
}

