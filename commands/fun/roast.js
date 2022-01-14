const fetch = require("node-fetch");
const Discord = require("discord.js");
// Test
module.exports = {
    name: "roast",
    description: "Roast Another User",
    async execute(message, args, client) {


        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser){
            
            return message.channel.send("No user Mentioned");
        }
        else{

        fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json")
            .then((res) => res.json())
            .then((json) => {
                const roastEmbed = new Discord.MessageEmbed()
                    .setTitle(
                        `${message.author.tag}'s roast to ` + mentionedUser.tag
                    )
                    .setDescription(json.insult)
                    .setTimestamp()

                    .setFooter('Evil Insult API')

                    return message.channel.send({embeds:[roastEmbed]});

                    
            });

        }
    },
};
