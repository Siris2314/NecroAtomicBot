const Discord = require('discord.js');
module.exports = {

  name:"restart",
  execute(message,args){

    console.log(message.author.id);
  

    message.channel.send('Bot Restart is commencing....');
    process.exit();
  }
}
