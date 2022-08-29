const { Client, Message, MessageEmbed } = require('discord.js')
const WomboDream = require('dream-api');
const fetch = require('node-fetch')

module.exports = {
    name:'art',
    description: 'AI Generated Art',
    options: [
        {
            name:'query',
            description:'Image Query',
            type:'STRING',
            required:true
        },
        {
            name:'style',
            description:'Style of Art',
            type:'NUMBER',
            required:false
        }

    ],

    run: async (client, interaction) => {

        const query = interaction.options.getString('query')
        const sty = interaction.options.getNumber('style')

        const GetStyle = await fetch('https://paint.api.wombo.ai/api/styles/').then(res => res.json())
        const style = GetStyle.map(style => {
            return {
              id: style.id,
              name: style.name,
            }
          })


        

        if(!sty){
            return interaction.followUp('Please specify a style, and re-run the command with the style number!' + "\n" + style.map(style => `\`${style.id}\` = \`${style.name}\``).join('\n'))
        }

        interaction.followUp(`Generating your image.......`)


        styName = " "

        for(let i = 0; i<GetStyle.length; i++){
            if(sty == GetStyle[i].id){
                styName = GetStyle[i].name
            }
        }




        let image = await WomboDream.generateImage(sty, query);

        console.log(query)
        console.log(sty)

        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${query.toUpperCase()} Art with style ${styName.toUpperCase()}`)
        .setImage(image.result.final)
        .setTimestamp()

        interaction.channel.send({embeds:[embed]})





    }
}