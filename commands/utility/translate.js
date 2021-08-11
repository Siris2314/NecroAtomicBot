const translate = require('@iamtraction/google-translate');
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'translate',
    description: 'Translate command',
    async execute(message,args, client){

    const option = args[0];

  try{
    if(option){
        const input = args.slice(1).join(" ");
        if(!input) return message.channel.send("Please specify text to translate")

        const translated = await translate(input, {to: option})


        const translatedEmbed = new MessageEmbed()
         .setTitle(`${message.author.username}'s Translation`)
         .addFields(
            { name: `Original Text`, value: `\`\`\`${input}\`\`\``, inline:true},
            { name: `Language`, value:`\`\`\`${option}\`\`\``, inline:false},
            { name: `Translated Text`, value: `\`\`\`${translated.text}\`\`\``, inline:false}
        )
         .setColor("RANDOM")
         .setTimestamp()



         return message.channel.send({embeds:[translatedEmbed]});

    }
} catch(err){
    console.log(err)
    message.channel.send("Error")

}
    }
}
