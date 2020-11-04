const {prefix, token, bot_info} = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const leveling = require('discord-leveling');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));




client.once('ready', () => {
  console.log(bot_info.name);
  console.log(bot_info.version);

});

client.once('disconnect', () => {

  console.log('Disconnect');
});




for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}



client.on('message', message => {

  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }

  let profile = leveling.Fetch(message.author.id);

  leveling.AddXp(message.author.id, 20);
  if(profile.xp + 20 > 150){
    leveling.AddLevel(message.author.id, 1)
    leveling.SetXp(message.author.id, 0)
    message.channel.send(`Good Job ${message.author.username}, you just advanced to level ${profile.level + 1}`);
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
