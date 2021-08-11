const fetch = require('node-fetch')
const Discord = require('discord.js')


module.exports = {
    name:'magikfy',
    description:'Magikfy user',

    async execute(message, args,client){
        let image =  message.mentions.users.first()?.displayAvatarURL({dynamic:false, format: "png"}) || message.author.displayAvatarURL({dynamic:false, format: "png"})

        let intensity = Number(args[0]);

        if(isNaN(intensity)) return message.channel.send('Please enter an intensity of the image, ranging from 1-10');
        await fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${image}&intensity=${intensity}`)
            .then(response => response.json())
            .then(json => {

                const attachment = new Discord.MessageAttachment(json.message, 'magik.png')

                message.channel.send({files: [attachment]});

                
            })



    }



}