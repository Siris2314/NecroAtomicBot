const Discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
    name: 'howgay',
    description: 'Gay Rate Command',
    async execute(message, args,client){
        const member = message.mentions.users.first() || message.author;
        const user = member.displayAvatarURL({dynamic:false})
        let gayrate = Math.floor(Math.random() * 101)

       let image = " ";

     image = await fetch(`https://api.cool-img-api.ml/gay/?image=${user}`)
            .then(response => 
                image = response.url
        )

        if(gayrate >=70){

         let embed = new Discord.MessageEmbed()
            .setTitle("Gayrate Machine")
            .setColor("#000000")
            .setImage(image)
            .setDescription(`${member.username} is \`${gayrate}%\` gay 🏳️‍🌈`)
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(embed)


        }
    else{
            
    
        let embed = new Discord.MessageEmbed()
            .setTitle("Gayrate Machine")
            .setColor("RANDOM")
            .setDescription(`${member.username} is \`${gayrate}%\` gay 🏳️‍🌈`)
            .setFooter(message.client.user.username, message.client.user.avatarURL())
        message.channel.send(embed)
     }
    
}
}
