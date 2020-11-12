const {prefix, token, bot_info} = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const expfile = require('./expfile.json');

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




client.on ('message', async message => {

  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }

  var addXP = Math.floor((Math.random() * 10)+2);

  if(!expfile[message.author.id]){
    expfile[message.author.id] = {
      xp: 0,
      level: 1,
      reqxp: 20
    }
    fs.writeFile("./expfile.json",JSON.stringify(expfile),function(err){
      if(err){
        console.log(err)
      }
    })
  }

  expfile[message.author.id].xp += addXP

  if(expfile[message.author.id].xp > expfile[message.author.id].reqxp){
    expfile[message.author.id].xp -= expfile[message.author.id].reqxp
    expfile[message.author.id].reqxp *= 2
    expfile[message.author.id].reqxp = Math.floor(expfile[message.author.id].reqxp)
    expfile[message.author.id].level += 1

    message.reply("You are now level " + expfile[message.author.id].level ).then(
      msg=>msg.delete({timeout: "10000"})
    )
  }


  fs.writeFile("./expfile.json",JSON.stringify(expfile),function(err){
    if(err){
      console.log(err)
    }
  })






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
