const {prefix, token, bot_info, youtube} = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {GiveawaysManager} = require('discord-giveaways')
const mongo = require('./mongo.js')
const levels = require('./levels.js')
const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");
const schema = require('./schemas/custom-commands.js')
const memberCount = require('./member-count.js')
const search = require('youtube-search')


const opts = {
  maxResults: 25,
  key: youtube,
  type: 'video'
}


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
  memberCount(client);



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

  if(message.content.toLowerCase() == '!search'){
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription("Please enter a search query. Please narrow your search")
    .setTitle("Youtube Search API")

    let embedMsg = await message.channel.send(embed);
    let filter = m => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {max: 1});
    console.log(query)
    let results = await search(query.first().content, opts).catch(err => console.log(err));
    if(results){
      let youtubeResults = results.results;
      let i = 0;
      let titles = youtubeResults.map(result => {
        i++;
        return i + ") " + result.title;
      });

      console.log(titles);
      message.channel.send({
        embed: {
          title:'Select which video you want by typing the number',
          description: titles.join("\n")
        }
      }).catch(err => console.log(err));

      filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length
      let collected = await message.channel.awaitMessages(filter, {max: 1});
      let selected = youtubeResults[collected.first().content - 1]

      embed = new Discord.MessageEmbed()
        .setTitle(`${selected.title}`)
        .setURL(`${selected.link}`)
        .setDescription(`${selected.description}`)
        .setThumbnail(`${selected.thumbnails.default.url}`)

        message.channel.send(embed);

    }
  }






    let content = message.content;
      if(!content) return;
          chatbot.getReply(content).then(r => message.channel.send(r));


  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const data = await schema.findOne({Guild: message.guild.id, Command: command})

  if(data){
    message.channel.send(data.Response)
  }



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
