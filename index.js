const {prefix, token, bot_info} = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./node_modules/commands').filter(file=>file.endsWith('.js'));




client.once('ready', () => {
  console.log(bot_info.name);
  console.log(bot_info.version);

});




for(const file of commandFiles){
  const command = require(`./node_modules/commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', message => {

  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)){
    return;
  }
  try{
    client.commands.get(command).execute(message, args);
  }catch(error){
    console.error(error);
    message.reply("Issue loading command");
  }
});









client.login(token);
