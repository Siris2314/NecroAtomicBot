require('dotenv').config();
const token = process.env.token;
var prefix = process.env.prefix;
const youtube = process.env.youtube;
const botname = process.env.botname;
const key1 = process.env.key1;
const Discord = require('discord.js');
const client = new Discord.Client({partial: ['MESSAGE']});
const fs = require('fs');
const db = require('./reconDB.js')
const {GiveawaysManager} = require('discord-giveaways')
const mongo = require('./mongo.js')
const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");
const schema = require('./schemas/custom-commands.js')
const memberCount = require('./member-count.js')
const search = require('youtube-search')
const DisTube = require('distube')
const { getPokemon } = require('./commands/pokemon');
const translate = require('@k3rn31p4nic/google-translate-api')
client.snipes = new Map();
const prefixSchema = require('./schemas/prefix')
const quickdb = require('quick.db')





const opts = {
  maxResults: 25,
  key: youtube,
  type: 'video'
}

// const status = (queue) => `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: false, youtubeCookie: key1, leaveOnStop: true, leaveOnEmpty: true});
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
  .on("playSong", (message, queue, song) => message.channel.send(
    `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
))
  .on("addSong", (message, queue, song) => message.channel.send(
    `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
))
  .on("playList", (message, queue, playlist, song) => message.channel.send(
    `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
))
  .on("addList", (message, queue, playlist) => message.channel.send(
    `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
))
// DisTubeOptions.searchSongs = true
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
})
// DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) => message.channel.send(`Searching canceled`))

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

function embedbuilder(client, message, color, title, description){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
    return message.channel.send(embed);
}



client.once('ready', async (client) => {




  console.log(botname);

  // let serverNum = await client.guild.cache.size;
  //
  // client.user.setPresence({
  //   activity: {
  //     name: `Infiltrating in ${serverNum} servers`,
  //     type:'WATCHING'
  //   },
  //   status: 'active'
  // })










  await mongo().then(mongoose => {
    try {
      console.log('Connected to mongo')
    } finally {
      mongoose.connection.close()
    }
  })



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

  var prefixes = await quickdb.fetch(`prefix_${message.guild.id}`);
  if(prefix === null){
    prefix = process.env.prefix;
  } else{
    prefix = prefixes
  }


  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }

  if(message.content.toLowerCase().startsWith('!necropokemon')) {
        const pokemon = message.content.toLowerCase().split(" ")[1];
        try {
            const pokeData = await getPokemon(pokemon);
            const {
                sprites,
                stats,
                weight,
                name,
                id,
                base_experience,
                abilities,
                types
            } = pokeData;
            const embed = new Discord.MessageEmbed()
            embed.setTitle(`${name} #${id}`)
            embed.setThumbnail(`${sprites.front_default}`);
            stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat, true));
            types.forEach(type => embed.addField('Type', type.type.name, true));
            embed.addField('Weight', weight);
            embed.addField('Base Experience', base_experience);
            message.channel.send(embed);
        }
        catch(err) {
            console.log(err);
            message.channel.send(`Pokemon ${pokemon} does not exist.`);
        }
    }

  if(message.content.toLowerCase() == '!necrosearch'){
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






  if(message.content.toLowerCase() == '!necrochat'){
    let content = message.content;
      if(!content) return;
          chatbot.getReply(content).then(r => message.channel.send(r));
    }


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

  if(command){
    const channel = client.channels.cache.get('800421170301501470')

    channel.send(

      `**${message.author.tag}** has used ${command} command in **${message.guild.name}**`
    )


  }






});

client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
});



client.on('messageDelete', async message => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
  })

  if(!message.partial){
    const channel = client.channels.cache.get('807398780160573501');

    if(channel){
      const embed = new Discord.MessageEmbed()
        .setTitle('Deleted Message')
        .addField('Author', `${message.author.tag} (${message.author.id})`)
        .addField('Channel', `${message.channel.name} (${message.channel.id})`)
        .setDescription(message.content)
        .setTimestamp();
      channel.send(embed);
    }
  }



});



client.translate = async(text, message) => {
  const lang  = await db.has(`lang-${message.guild.id}`) ? await db.get(`lang-${message.guild.id}`) : 'en';
  const translated = await translate(text, {from: 'en', to: lang})
  return translated.text;
}

const voiceCollection = new Discord.Collection();

client.on("voiceStateUpdate", async (oldState, newState) => {
  const user = await client.users.fetch(newState.id)
  const member = newState.guild.member(user)

  if(!oldState.channel && newState.channel.id === "815461483219517450"){
    const channel = await newState.guild.channels.create(user.tag, {
      type: "voice",
      parent: newState.channel.parent,
    });
    member.voice.setChannel(channel);
    voiceCollection.set(user.id, channel.id)
  } else if(!newState.channel){
    if(oldState.channelID === voiceCollection.get(newState.id)){
      return oldState.channel.delete();
    }
  }
});




client.on('guildMemberAdd', async (member) => {
    if(db.has(`captcha-${member.guild.id}`)=== false) return;
    const url = 'https://api.no-api-key.com/api/v2/captcha';
        try {
            fetch(url)
                .then(res => res.json())
                .then(async json => {
                    console.log(json)
                    const msg = await member.send(
                        new MessageEmbed()
                            .setTitle('Please enter the captcha')
                            .setImage(json.captcha)
                            .setColor("RANDOM")
                    )
                    try {
                        const filter = (m) => {
                            if(m.author.bot) return;
                            if(m.author.id === member.id && m.content === json.captcha_text) return true;
                            else {
                                msg.channel.send("You have answered the captcha incorrectly!")
                            }
                        };
                        const response = await msg.channel.awaitMessages(filter, {
                            max : 1,
                            time : 10000,
                            errors : ['time']
                        })
                        if(response) {
                            msg.channel.send('Congrats, you have answered the captcha.')
                        }
                    } catch (error) {
                        msg.channel.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
                        member.kick()
                    }
                })
        } catch (error) {
            console.log(error)
        }
})















client.login(token);
