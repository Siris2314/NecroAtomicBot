const {prefix, token, bot_info} = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {GiveawaysManager} = require('discord-giveaways')
const mongo = require('./mongo.js')
const levels = require('./levels.js')


client.commands = new Discord.Collection();
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery:5000,
  default: {
    botsCanWin: false,
    exemptPermission: ["MANAGE_MESSAGES", "ADMINSTRATOR"],
    embedColor: "RANDOM",
    reaction: "🎁"


  }
})
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));




client.once('ready', async () => {
  console.log(bot_info.name);
  console.log(bot_info.version);
  function randomStatus() {
    let status = ['Working', 'Trying to Stay Up', 'Sniping Courses','Helping Homies']
    let rstatus = Math.floor(Math.random() * status.length)
    client.user.setActivity(status[rstatus], {type: "TASK: "})

  }

  await mongo().then(mongoose => {
    try {
      console.log('Connected to mongo')
    } finally {
      mongoose.connection.close()
    }
  })

  levels(client);



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

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)){
    return;
  }
  try{
    client.commands.get(command).execute(message, args, client);
  }catch(error){
    console.error(error);
    message.reply("Issue loading command");
  }





});










client.login(token);
