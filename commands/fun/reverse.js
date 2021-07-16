const Discord = require("discord.js")

module.exports = {

    name:"reverse",
    description:"Reverses text",

    async execute(message,args,client) {

        let text = args.join(" ")
        if(!text) return message.channel.send('Please provide text to reverse')

        let newtext = text.split("").reverse().join("")
        const embed = new Discord.MessageEmbed()
          .setTitle("Word Reverse")
          .addFields(
            { name: `Original Text`, value: `\`\`\`${text}\`\`\``, inline:true},
            { name: `Reversed Text`, value: `\`\`\`${newtext}\`\`\``, inline:false}
          )
          .setColor("RANDOM")
          .setTimestamp()

        message.channel.send(embed)


    }



}