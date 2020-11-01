const math = require('mathjs');
const Discord = require('discord.js');

module.exports = {
  name:"calculator",
  description:"Calculates Stuff",

  async execute(message,args){

    if(!args[0]){
      return message.channel.send("Enter a Question Please")

    }

    let response;

    try{
      response = math.evaluate(args.join(" "))
    }catch(e){
      return message.channel.send("Provide a Valid Question")
    }

    const embed = new Discord.MessageEmbed()
      .setColor("random")
      .setTitle("Calculator")
      .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
      .addField('Question', `\`\`\`css\n${response}\`\`\``)

      message.channel.send(embed)




  }
}
