const axios = require('axios')
const Discord = require('discord.js')

module.exports = {
    name:'dictionary',
    description:'Searches dictionary for terms',

    async execute(message,args,client){

        const query = args.join(' ')

        if(!query) return message.channel.send('Please provide a query to search')

        axios.get(`https://some-random-api.ml/dictionary?word=${query}`)
            .then(response => {

                const def = response.data.definition 


                const embed = new Discord.MessageEmbed()
                    .setTitle(`${query}`)
                    .setDescription(`${def}`)


                    message.channel.send({embeds:[embed]});





            })


    }

}