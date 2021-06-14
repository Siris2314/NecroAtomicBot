const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name:'pp',
    description:'PP Size(Dank Memer Style)',

 async execute(message, args,client){
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const size = (user.id.slice(-3) % 20) + 1;
        const sizee = size/2.54

    let embed = new MessageEmbed()
    .setColor("#242424")
    .setTitle(`PP size machine`)
    .setDescription(`${sizee.toFixed(2)} inch\n ${user.user.username}'s PP \n8${"=".repeat(size)}D`)

        await message.channel.send(embed)
  }
}