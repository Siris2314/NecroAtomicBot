const {Client, Message, MessageEmbed} = require('discord.js')
const figlet = require('figlet')

module.exports = {
    name: "text-art",
    description:"Make ascii text art",

    async execute(message,args,client){
        figlet.text(args.join(" "), {
            font:'',
            horizontalLayout:'default',
            verticalLayout:'default',
            width: 90,
            whitespaceBreak: true,

        }, async(err, data) => {
            message.channel.send(`\`\`\`${data}\`\`\``)
        })
    }
}