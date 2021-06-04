const { MessageEmbed } = require('discord.js')
const request = require("node-superfetch")

module.exports = {
    name: 'would-you-rather',
    description: "Send some would-you rather questions",
    async execute(message, args,client){

        // if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(":x: You dont have the perms to run this command.")

        let option1
        let option2
        let URLresult

        const { text } = await request.get('http://either.io/')
        URLresult = await JSON.parse(text.match(/window.initial_question = (\{.+\})/)[1]).question

        const url = `http://either.io/${URLresult.id}/${URLresult.slug}`

        option1 = await URLresult.option_1
        option2 = await URLresult.option_2

        const exampleEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Would You Rather')
        .setTimestamp()
        .setFooter(`By ${URLresult.display_name}`)
        .setURL(url)
        .setDescription(`${option1} **or** ${ option2}? \n\nFirst(Green) Checkbox is for Option 1 and Second(Blue Checkbox) is for Option 2`)

    
        message.channel.send(exampleEmbed).then(embedMessage => {
            embedMessage.react('✅');
            embedMessage.react('☑️');
        })


    }
}