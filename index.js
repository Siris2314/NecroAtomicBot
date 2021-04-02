require('dotenv').config();
const token = process.env.token;
const prefix = process.env.prefix
const youtube = process.env.youtube;
const botname = process.env.botname;
const key1 = process.env.key1;
const Discord = require('discord.js');
const client = new Discord.Client({
  partials:['CHANNEL', 'MESSAGE', 'GUILD_MEMBER','REACTION']
});
const fs = require('fs');
const db = require('./reconDB.js')
const {GiveawaysManager} = require('discord-giveaways')
const mongo = require('./mongo.js')
const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");

const search = require('youtube-search')
const DisTube = require('distube')
const {MessageAttachment} = require('discord.js')
const { getPokemon } = require('./commands/pokemon');
const translate = require('@k3rn31p4nic/google-translate-api')
client.snipes = new Map();
const prefixSchema = require('./schemas/prefix')
const canvas = require('discord-canvas')
const Schema = require('./schemas/welcomeChannel')
const reactionSchema = require('./schemas/reaction-roles')
const ms = require('ms')
const countSchema = require('./schemas/member-count')
const {Manager}= require('erela.js')





client.manager = new Manager({
  nodes: [{
    host: 'localhost',
    port:9001,
    password:'password123'
  }],

  send(id, payload){
    const guild = client.guilds.cache.get(id);

    if(guild) guild.shard.send(payload);
  }
})
.on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
.on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
.on("trackStart", (player, track) => {
  client.channels.cache
    .get(player.textChannel)
    .send(`Now playing: ${track.title}`);
})
.on("queueEnd", (player) => {
  client.channels.cache
    .get(player.textChannel)
    .send("Queue has ended.");

  player.destroy();
});



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

function embedbuilder(client, message, color, title, description){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
    return message.channel.send(embed);
}


client.login(token);



client.on('ready', async () => {

  console.log(botname);
  client.manager.init(client.user.id)


  await mongo().then(mongoose => {
    try {
      console.log('Connected to mongo')
    } finally {
      mongoose.connection.close()
    }
  })
  setInterval(() =>{
    countSchema.find().then((data) => {
      if(!data && !data.length) return;
      data.forEach((value) => {
        const guild = client.guilds.cache.get(value.Guild)
        const memberCount = guild.memberCount;
        if(value.Member != memberCount){
          console.log("Member count differs")
          const channel = guild.channels.cache.get(value.Channel)

          channel.setName(`Members: ${memberCount}`)

          value.Member = memberCount;
          value.save()
        }
      })
    })
  }, ms('15 Minutes'))

  const arrayOfStatus = [
    `${client.guilds.cache.size} servers`,
    `${client.channels.cache.size} channels`,
    `${client.users.cache.size} users`,
    `run !necro`

  ];

  let index = 0;
  setInterval(() => {
    if(index == arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    client.user.setActivity(status);
    index++
  }, 5000)

 








});


client.on("raw", (d) => client.manager.updateVoiceState(d));

client.once('disconnect', () => {

  console.log('Disconnect');
});




for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}



client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))

        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }




client.on ('message', async (message) => {


  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }


  if (message.content.startsWith("!necroplay")) {
   
    const res = await client.manager.search(
      message.content.slice(6),
      message.author
    );

    
    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    
    player.connect();

    
    player.queue.add(res.tracks[0]);
    message.channel.send(`Enqueuing track ${res.tracks[0].title}.`);

    
    if (!player.playing && !player.paused && !player.queue.size)
      player.play();

    
    if (
      !player.playing &&
      !player.paused &&
      player.queue.totalSize === res.tracks.length
    )
      player.play();
  } else if(message.content.startsWith("!necroskip")){
      const player = client.manager.players.get(message.guild.id)
      player.stop();

  } else if(message.content.startsWith("!necropause")){
    const player = client.manager.players.get(message.guild.id)
    if(player.paused){
      player.pause(false)
      message.channel.send('Music has been resumed')
    } else{
      player.pause(true)
      message.channel.send('Music has been paused')
    }

  } else if(message.content.startsWith("!necroloop")){
    const player = client.manager.players.get(message.guild.id)
    if(player.queueRepeat){
      player.setQueueRepeat(false);
      message.channel.send("Music is not on repeat")
    } else{
      player.setQueueRepeat(true);
      message.channel.send("Music is now on repeat")
    }
  } else if (message.content.startsWith("!necrosearch")) {
    const index = message.content.indexOf(" ");
    const query = message.content.slice(index + 1);
    const results = await client.manager.search(query, message.author);
    const tracks = results.tracks.slice(0, 10);
    let resultsDescription = "";
    let counter = 1;
    for (const track of tracks) {
      resultsDescription += `${counter}) [${track.title}](${track.uri})\n`;
      counter++;
    }
    const embed = new MessageEmbed().setDescription(resultsDescription);
    message.channel.send(
      "What song would you like to choose? Enter the number.",
      embed
    );
    const response = await message.channel.awaitMessages(
      (msg) => msg.author.id === message.author.id,
      {
        max: 1,
        time: 30000,
      }
    );
    const answer = response.first().content;
    const track = tracks[answer - 1];
    console.log(track);
    const player = client.manager.players.get(message.guild.id);
    if (player) {
      player.queue.add(track);
      message.channel.send(`${track.title} was added to the queue.`);
    } else {
      message.channel.send(
        "The bot is not in a voice channel or does not have a player existing."
      );
    }
  }







   else if(message.content.startsWith("!necrostop")){
    const player = client.manager.players.get(message.guild.id)
    if(!player) return message.channel.send('Nothing is playing')
    await player.destroy()
    message.channel.send('Left VC')
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

  if(message.content.toLowerCase() == '!necroytsearch'){
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
client.on('guildMemberAdd', async(member) => {
  Schema.findOne({Guild: member.guild.id}, async(e, data) => {
    if(!data) return;
    const user = member.user;
    const image = await new canvas.Welcome()
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setGuildName(member.guild.name)
      .setAvatar(user.displayAvatarURL({format: "png"}))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground("http://2.bp.blogspot.com/_708_wIdtSh0/S_6CRX-cA4I/AAAAAAAABf4/PgAp07RgaB8/s1600/Colorful+%2845%29.jpg")
      .toAttachment();
    
    
    const attachment = new Discord.MessageAttachment(
      (await image).toBuffer(), 
      "goodbye-image.png"
      
      );

    console.log(attachment)
    console.log(user)
    const channel = member.guild.channels.cache.get(data.Channel)
    await channel.send(attachment)

  });
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

const voiceCollection = new Discord.Collection()

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

client.on('messageReactionAdd', async(reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch()
  if(user.bot) return;

  reactionSchema.findOne({Message: reaction.message.id}, async(err, data) => {
    if(!data) return;
    if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

    const [roleid] = data.Roles[reaction.emoji.name]
    reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
    user.send('You have acquired this role')

  })
})


client.on('messageReactionRemove', async(reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch()
  if(user.bot) return;

  reactionSchema.findOne({Message: reaction.message.id}, async(err, data) => {
    if(!data) return;
    if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

    const [roleid] = data.Roles[reaction.emoji.name]
    reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
    user.send('Role has been removed')

  })
})




