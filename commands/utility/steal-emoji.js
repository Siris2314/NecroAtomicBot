const {Client, Message, Util, MessageEmbed} = require('discord.js');

module.exports = {
  name:'steal-emoji',
  description:'Steals Emojis(Nitro Required to Steal)',

  async execute(message,args,client){

    if(!args.length){
      return message.channel.send("Please specify some emoji to steal");
    }

    if(!message.guild.me.permissions.has('MANAGE_EMOJIS')) return message.channel.send('Invalid Bot Perms')

    if(!message.member.permissions.has('MANAGE_EMOJIS')) return message.channel.send('Invalid User Perms')

    const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
		if (!name) {
			return message.channel.send("Please provide an emoji name to set ");
		}
		if (name.length < 2 || name > 32) {
			return message.channel.send("Emoji name length must be between 2 and 32 characters");
		}     

    for(const rawEmoji of args){
      const parsedEmoji = Util.parseEmoji(rawEmoji);



      if(parsedEmoji.id){
        const extension = parsedEmoji.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
        message.guild.emojis.create(url, name)
          .then((emoji) => 

        {
          
            const embed = new MessageEmbed()
              .setTitle('Emoji Added')
              .setTitle('Emoji Added')
              .setDescription(`Emoji **${name.toUpperCase()}** was added`)
              .setThumbnail(emoji.url) 
              .setTimestamp()
              .setColor('RANDOM')
            message.channel.send({embeds:[embed]})
          })
        }
      }
    }
  }

