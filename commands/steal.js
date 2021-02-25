const {Client, Message, Util} = require('discord.js');

module.exports = {
  name:'steal-emoji',
  description:'steals emojis',

  async execute(message,args,client){

    if(!args.length){
      return message.channel.send("Please specify some emoji to steal");
    }

    for(const rawEmoji of args){
      const parsedEmoji = Util.parseEmoji(rawEmoji);

      if(parsedEmoji.id){
        const extension = parsedEmoji.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
        message.guild.emojis.create(url, parsedEmoji.name)
          .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``))
      }
    }
  }
}
