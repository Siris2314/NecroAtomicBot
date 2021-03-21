const translate = require('@iamtraction/google-translate');
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'translate',
    description: 'Translate command',
    async execute(message,args, client){

    const option = args[0];

  try{
    if(option){
        const input = args.shift().shift().join(" ");
        if(!input) return message.channel.send("Please specify text to translate")

        const translated = await translate(input, {to: option})

        message.channel.send(translated.text)

    }
} catch(err){
    console.log(err)
    message.channel.send("Error")

}
    }
}
