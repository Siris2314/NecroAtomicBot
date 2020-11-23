const Discord = require('discord.js');
const fs = require('fs');
const commandFile = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));


module.exports = {

  name: "help",
  description: "Helper command for bot",

  async execute(message, args, client){

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.guild.name} Help Center`, message.guild.iconURL({dynamic: true}))
      .setThumbnail(this.client.user.displayAvatarURL({dynamic: true}))
      .setTimestamp();

      if(commandFile){
        const cmd = this.client.commandFile.get(commandFiles)  || this.client.commandFile.get(this.aliases.get(commandFile));

      }

      if(!cmd){
        return message.channel.send("Invalid Command")
      }

       embed.setAuthor(`Command Helper`, this.client.user.displayAvatarURL())
       embed.setDescription([
         `**> Description:** ${cmd.description}`
       ])

    return message.channel.send(embed);


  }
}
