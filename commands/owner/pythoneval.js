let { PythonShell } = require("python-shell");
const {MessageEmbed} = require('discord.js')
require("dotenv").config();
const owner = process.env.ownerid

module.exports = {
  name: "pyeval",
  description: "Python Eval Command(Owner Only)",
  async execute(message,args,client) {
    if (message.author.id !== owner) return;
    var input = args.join(" ");
    if (!input) {
      
      return message.reply({
        embeds: [new MessageEmbed() .setTitle("Warning") .setDescription("There is nothing to be pyevaled")
        ],
      });
    }
    let options = {
      mode: "text",
      path:"/usr/bin/python3"
    };
    let pshell = PythonShell.runString(input, options, function (err) {
      if (err)
        return message.reply({
          embeds: [ new MessageEmbed() .setTitle("PYTHON EVAL ERROR") .addField("Command:", `\n\`\`\`py\n${input}\n\`\`\``) .addField("RESULT:", `\n\`\`\`${err}\`\`\`` )
            ],
        });
    });
    pshell.on("error", function (err) {
      if (err)
      return message.reply({
        embeds: [ new MessageEmbed() .setTitle("PYTHON EVAL ERROR") .addField("Command:", `\n\`\`\`py\n${input}\n\`\`\``) .addField("RESULT:", `\n\`\`\`${err}\`\`\`` )
          ],
      });
    });
    pshell.on("message", function (output) {
      message.reply({
        embeds: [ new MessageEmbed() .setTitle("PYTHON EVAL") .setDescription(`**RESULT: **\n\`\`\`${output.toString()}\`\`\``) .addField("Command:", `\n\`\`\`py\n${input}\n\`\`\``) .setColor("BLUE")
        ],
      });
    });
  },
};