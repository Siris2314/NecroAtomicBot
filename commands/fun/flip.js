const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'flip',
    description: 'Flips A Coin',
    category: "fun",

    async execute(message, args, client){
            let ht = ['Heads',
          'Tails'
          ];
          const embed = new MessageEmbed()
            .setColor("RANDOM")
          .setDescription(`It's **${ht}**`)
       message.channel.send({embeds: [embed]})
    }
  }
