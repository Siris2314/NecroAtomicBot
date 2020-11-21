const Discord = require('discord.js');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));


module.exports = {

  name: "help",
  description: "Helper command for bot",

  async execute(message, args, client){

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.guild.name} Help Center`, message.guild.iconURL({dynamic: true}))
      .setThumbnail(this.client.user.displayAvatarURL)
      .setTimestamp();

      if(commandFiles){
        const cmd = this.client.commandFiles.get(commandFiles)  || this.client.commandFiles.get(this.aliases.get(commandFiles));

      }

  }
}
