const Discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
    name: 'howgay',
    description: 'Gay Rate Command',
    async execute(message, args,client){

    try{
        const member = message.mentions.users.first() || message.author;
        const user = member.displayAvatarURL({dynamic:false, format:'png'})
        let gayrate = Math.floor(Math.random() * 101)

       let image = " ";

     image = await fetch(`https://luminabot.xyz/api/image/gay?image=${user}`)
            .then(response => 
                image = response.url
          )

        if(gayrate >=70){

         let embed = new Discord.MessageEmbed()
            .setTitle("Gayrate Machine")
            .setColor("#000000")
            .setImage(image)
            .setDescription(`${member.username} is \`${gayrate}%\` gay 🏳️‍🌈`)
            .setFooter({text:message.client.user.username, iconURL: message.client.user.avatarURL()})
            message.channel.send({embeds:[embed]})
            

        }
    else{
            
    
        let embed = new Discord.MessageEmbed()
            .setTitle("Gayrate Machine")
            .setColor("RANDOM")
            .setDescription(`${member.username} is \`${gayrate}%\` gay 🏳️‍🌈`)
            .setFooter({text:message.client.user.username, iconURL: message.client.user.avatarURL()})
        message.channel.send({embeds:[embed]})
     }
    } catch(err){
        message.channel.send("API Error")
    }
}
}
