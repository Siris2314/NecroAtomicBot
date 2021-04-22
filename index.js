require('dotenv').config();
const token = process.env.token;
const mongoPath = process.env.mongoPath;
const mongoose = require('mongoose');
const youtube = process.env.youtube;
const botname = process.env.botname;
const key1 = process.env.key1;
const Discord = require('discord.js');
const path = require('path')
const client = new Discord.Client({
  partials:['CHANNEL', 'MESSAGE', 'GUILD_MEMBER','REACTION']
});
const fs = require('fs');
// const db = require('./reconDB.js')
const {GiveawaysManager} = require('discord-giveaways')
const afk = new Discord.Collection();
const moment = require('moment');
const Levels = require('discord-xp')
Levels.setURL(mongoPath)

const search = require('youtube-search')  
const DisTube = require('distube')
const music = new DisTube(client, {leaveOnEmpty: true, leaveOnStop: true})
const {MessageAttachment} = require('discord.js')
const { getPokemon } = require('./commands/pokemon');
client.snipes = new Map();
const canvas = require('discord-canvas')
const Schema = require('./schemas/welcomeChannel')
const guildSchema = require('./schemas/Guilds')
const reactionSchema = require('./schemas/reaction-roles')
const ms = require('ms')
const countSchema = require('./schemas/member-count')
const {Manager}= require('erela.js')
const antijoin = new Discord.Collection()
const blacklistedWords = new Discord.Collection();
const {chatBot} = require('reconlx')
const chatschema = require('./schemas/chatbot-channel')
const blacklistSchema = require('./schemas/blacklist')
const starboardcollection = new Discord.Collection();

module.exports = {antijoin, blacklistedWords, afk, starboardcollection};

const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
music.on('playSong', (message, queue,song) => {
  const embed = new Discord.MessageEmbed()
  .setDescription(`Playing: [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n${status(queue)}`)
  .setColor("RANDOM")
  .setThumbnail(song.thumbnail)
  message.channel.send(embed)
}).on("addSong", (message, queue, song) => message.channel.send(
  `Added ${song.name} - \`${song.formattedDuration}\` to the queue`
)).on("addList", (message, queue, playlist) => {
  message.channel.send(
    `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
)
}).on("playList", (message, queue, playlist, song) => {
 const embed = new Discord.MessageEmbed()
 .setDescription( `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
 .setColor("RANDOM")
 .setThumbnail(song.thumbnail)
message.channel.send(embed)
}).on('initQueue', queue => {
  
  queue.autoplay = false;
  queue.volume =100;
}).on("empty", message => {
  message.channel.send("Channel is empty. Leaving the channel")
}).on('error', (message, error) => {
  message.channel.send(`An error has occured ${error}`)
})
client.music = music;





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
  






client.on('ready', async () => {

  console.log(botname);
  console.log("Heroku Connected")
  client.manager.init(client.user.id)


  await mongoose.connect(mongoPath, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(console.log('Connected to Mongo'))


  blacklistSchema.find().then((data) => {
      data.forEach((val) => {
        blacklistedWords.set(val.Guild, val.Words)
      })
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










client.on ('message', async (message) => {


  if(!message.guild || message.author.bot){
    return;
  }

  const randomXP = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP)








  const splittedMsgs = message.content.split(' ');

  let deleting = false;

  await Promise.all(
    splittedMsgs.map((content) => {
      if(blacklistedWords.get(message.guild.id)?.includes(content.toLowerCase())) deleting = true

    })
  )

  if(deleting) return message.delete();

  await chatschema.findOne({Guild: message.guild.id}, async(err, data) => {
    if(!data) return;

    if(message.channel.id !== data.Channel) return;

    chatBot(message, message.content, message.author.id)

  })

  const mentionedMember = message.mentions.members.first()

  if(mentionedMember){

    const data = afk.get(mentionedMember.id)
    

    if(data){
      await message.delete()
      const[timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow()
      
      message.channel.send(`${mentionedMember.user.username} is currently afk (${timeAgo})\nReason: ${reason}`)

    }
  }

  const getData = afk.get(message.author.id)
  if(getData){
    afk.delete(message.author.id)
    message.channel.send(`${message.member} afk has been removed`)
  }


  const settings = await guildSchema.findOne({
    guildID: message.guild.id
}, (err, guild) => {
    if (err) console.error(err)
    if (!guild) {
        const newGuild = new guildSchema({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: process.env.PREFIX
        })
        

        newGuild.save()
         .then(result => console.log(result))
         .catch(err => console.error(err));

        return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
    }
});

  const prefix = settings.prefix;


  
  
  if(!message.content.startsWith(prefix)) return;




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



  const getCollection = antijoin.get(member.guild.id)
  if(!getCollection) return;
  if(!getCollection.includes(member.user)){getCollection.push(member.user)}
  member.kick({reason: 'Antijoin was enabled'})

  });
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

  const handleStarboard = async () => {
    const reactionguild = starboardcollection.get(reaction.message.guild.id);
    const channel = reactionguild;
    const starboard = client.channels.cache.get(channel.id)
    const msgs = await starboard.messages.fetch({ limit: 100 });
    const existingMsg = msgs.find(msg => 
        msg.embeds.length === 1 ?
        (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
    if(existingMsg) existingMsg.edit(`${reaction.count} - ⭐`);
    else {
        const embed = new Discord.MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
            .setDescription(`**[Jump to this message](${reaction.message.url})**\n\n${reaction.message.content || ''}\n`)
            .setFooter(reaction.message.id + ' - ' + new Date(reaction.message.createdTimestamp));
          
            if (reaction.message.attachments.array().length > 0) {
              embed.setImage(reaction.message.attachments.first().url);
            }
          
        if(starboard)
            starboard.send(`1 - ⭐ | ${reaction.message.channel}`, embed);
    }
}
        handleStarboard();

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
  const handleStarboard = async () => {
    const reactionguild = starboardcollection.get(reaction.message.guild.id);
    const channel = reactionguild;
    const starboard = client.channels.cache.get(channel.id)
    const msgs = await starboard.messages.fetch({ limit: 100 });
    const existingMsg = msgs.find(msg => 
        msg.embeds.length === 1 ? 
        (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
    if(existingMsg) {
        if(reaction.count === 0)
            existingMsg.delete({ timeout: 2500 });
        else
            existingMsg.edit(`${reaction.count} - `)
    };
}

        handleStarboard();




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

client.login(token);




