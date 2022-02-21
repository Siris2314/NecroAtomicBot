const {exec} = require('child_process')
const {MessageEmbed} = require('discord.js')
require('dotenv').config()
const ownerid = process.env.ownerid

module.exports = {
    name:'bashexec',
    description:'Executes Code in Bash Console',

    async execute(message, args,client){

        if(message.author.id !== ownerid){
           return message.channel.send("Owner Only Command")
        }
        try {
            message.channel.sendTyping();
            exec(args.join(" ") || "date", function (err, stdout, stderr) {
              if (err) {
                const emErr = new MessageEmbed()
                  .setAuthor(`Command Executed!`)
                  .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
                  .addField(`📤 OUTPUT 📤`)
                  .setTimestamp()
                  .setColor("#FF0000")
                  .setFooter(`Requested by: ${message.author.tag}`);
                return message.channel.send({ embeds: [emErr] });
              }
              const emSuccess = new MessageEmbed()
                .setAuthor(`Command Executed!`)
                .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
                .addField(`📤 OUTPUT 📤`, `\`\`\`xl\n${stdout}\n\`\`\``)
                .setTimestamp()
                .setColor(123456)
                .setFooter(`Requested by: ${message.author.tag}`);
              return message.channel.send(emSuccess).catch((err) => {
                const emSuccess = new MessageEmbed()
                  .setAuthor(`Command Executed!`)
                  .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
                  .addField(
                    `📤 OUTPUT 📤`,
                    `\`\`\`xl\n${stdout.substr(0, 1000)}\n\`\`\``
                  )
                  .setTimestamp()
                  .setColor(123456)
                  .setFooter(`Requested by: ${message.author.tag}`);
                message.channel.send({ embeds: [emSuccess] });
              });
            });
          } catch (err) {
            const embed = new Discord.MessageEmbed()
              .setAuthor(`Command Executed!`)
              .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(" ")}\`\`\``)
              .addField(`📤 OUTPUT 📤`, `\`\`\`xl\n${err.toString()}\n\`\`\``)
              .setTimestamp()
              .setColor("#FF0000")
              .setFooter(`Requested by: ${message.author.tag}`);
            message.channel.send({ embeds: [embed] });
          }
    }
}