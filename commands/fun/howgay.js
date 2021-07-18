const Discord = require("discord.js")

module.exports = {
    name: 'howgay',
    description: 'Sends you your gay rate',
    async execute(message, args,client){
        const taggedUser = message.mentions.users.first();
        let gayrate = Math.floor(Math.random() * 101)

    if(!taggedUser) {
        const user = message.author
        let gayrateEmbed = new Discord.MessageEmbed()
                .setTitle("Gayrate Machine")
                .setColor("#000000")
                .setDescription(`${user.username} is \`${gayrate}%\` gay 🏳️‍🌈`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
        message.channel.send(gayrateEmbed).catch(e => {
        console.log(e)
    });

    } else {
        let argsEmbed = new Discord.MessageEmbed()
            .setTitle("Gayrate Machine")
            .setColor("#000000")
            .setDescription(`${taggedUser.username} is \`${gayrate}%\` gay 🏳️‍🌈`)
            .setFooter(message.client.user.username, message.client.user.avatarURL())
        message.channel.send(argsEmbed).catch(e => {
        console.log(e)
                    })
                }
    }
}