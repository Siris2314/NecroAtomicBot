const fetch = require('node-fetch')
const {MessageAttachment} = require('discord.js')

module.exports = {
    name:'oogway',
    description:'The AllMighty is Here',

    async execute(message,args,client){

        const input = args.join(" ")

        if(!input) return message.reply({content:"Please provide text to display"})


       await fetch(`https://luminabot.xyz/api/image/oogway?text=${(input)} `, {
            method: 'GET'})
            .then(res => res.buffer())
            .then((data) => {

                        
                const attachment = new MessageAttachment(data, 'oogway.png');

                message.channel.send({files:[attachment]})
            })


       
      
    }

}
