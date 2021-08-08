const canva = require('canvacord')
const Discord = require('discord.js')

module.exports = {

  name:"change",
  description:"change my mind meme",

  async execute(message, args, client){

    let text = args.join(" ");

    if(!args[0]){
      message.channel.send("Please send some text to meme")
    }

    let image = await canva.Canvas.changemymind(text);

    let attachment = new Discord.MessageAttachment(image, "cmm.png");

    message.channel.send({files: [attachment]});
  }
}
