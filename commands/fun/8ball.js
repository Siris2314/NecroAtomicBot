const neko = require('nekos.life');
const nekoclient = new neko();
const {MessageEmbed} = require('discord.js')

module.exports = {
    name:"8ball",
    description:"Plays 8 Ball Game",

    async execute(message, args,client) {

      try{
        const text = args.join(" ");
        if(!text) return message.channel.send({content:'Provide Text to play 8 Ball'})
       await nekoclient.sfw['8Ball'](text).then(result => {
            const embed = new MessageEmbed()
              .setTitle(text)
              .setDescription(result.response)
              .setImage(result.url)

            message.channel.send({embeds:[embed]})
        })


    } catch(err){
        message.channel.send({content:'API Error'})
    }

        
        

    }


}