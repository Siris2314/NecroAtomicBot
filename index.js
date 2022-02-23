//Discord Client,with all intents and permissions set 
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
  intents: 32767,
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
  },
  restTimeOffset: 0,
});



/* All Module Imports for the Bot */
require("dotenv").config();
const token = process.env.token;
const mongoPath = process.env.mongoPath;
const mongoose = require("mongoose");
const background = "./assets/background.jpg";
const youtube = process.env.youtube;
const botname = process.env.botname;
const colors = require("colors");
const fetch = require("node-fetch");
const logger = require("./logger");
const { red, green, blue, yellow, cyan } = require('colors');
const ascii = require("ascii-table");
const { Captcha } = require("captcha-canvas");
const captchaSchema = require("./schemas/captcha");
const { table } = require("table");
const buttonrr = require("./schemas/buttonrr");
const antiraid = require("./schemas/antiraid");
const ownerID = process.env.ownerid;
const { format } = require("./functions2");
const axios = require("axios");
const counterSchema = require("./schemas/count");
const path = require("path");
const blacklistWords = require('./schemas/FilterDB');
const nsfwschema = require("./schemas/nsfw");
const banner = "./assets/bot_long_banner.png";
require("dotenv").config();
const nsfwtoken = process.env.nsfw;
const tf = require('@tensorflow/tfjs-node')
const nsfw = require('nsfwjs')
const starboardSchema = require("./schemas/starboard");
const fs = require("fs");
const afk = new Discord.Collection();
const antiscam = require("./schemas/antiscam");
const unsafe = require("./unsafe.json");
const moment = require("moment");
const Levels = require("discord-xp");
const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const welcomeMessage = require('./schemas/welcomeMessage')
const { VoiceClient } = require("djs-voice");
const afkschema = require("./schemas/afk");
const weebytoken = process.env.weeby;
const WeebyAPI = require('weeby-js');
const weeby = new WeebyAPI(weebytoken);
const chalkAnimation = require('chalk-animation')

const Nuggies = require('nuggies');

client.snipes = new Discord.Collection();
const Canvas = require("canvas");

const Schema = require("./schemas/welcomeChannel");
const guildSchema = require("./schemas/Guilds");

const ms = require("ms");
const altschema = require("./schemas/anti-alt");
const { DiscordTogether } = require("discord-together");
client.discordTogether = new DiscordTogether(client, {
  token: token,
});
const rpctoken = process.env.rpc;
const RPC = require("discord-rpc");
const rpc = new RPC.Client({ transport: "ipc" });

const customSchema = require("./schemas/custom-welcome");
const countSchema = require("./schemas/member-count");
const autoroleschema = require("./schemas/autorole");

const jointocreate = require('./schemas/jointocreatevc');
const blacklistserver = require("./schemas/blacklist-server");
const inviteschema = require("./schemas/anti-invite");
const ghostpingschema = require("./schemas/ghostping");
const Pings = new Discord.Collection();
const chatschema = require("./schemas/chatbot-channel");
const muteschema = require("./schemas/mute");
const starboardcollection = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.filters = new Discord.Collection()
client.filtersLog = new Discord.Collection()
client.voicetemp = new Discord.Collection();

//VoiceClient for the Voice Channel Leveling System
const voiceClient = new VoiceClient({
  allowBots: false, //Bots Will Not Be Counted
  client: client, //Discord Client
  debug: false,
  mongooseConnectionString: mongoPath, //Mongo Database Connection
}); 


const defaultGiveawayMessages = {
	dmWinner: true,
	giveaway: '🎉🎉 **GIVEAWAY!** 🎉🎉',
	giveawayDescription: '🎁 Prize: **{prize}**\n🎊 Hosted by: {hostedBy}\n⏲️ Winner(s): `{winners}`\n\nRequirements: {requirements}',
	endedGiveawayDescription : '🎁 Prize: **{prize}**\n🎊 Hosted by: {hostedBy}\n⏲️ Winner(s): {winners}',
	giveawayFooterImage: 'https://cdn.discordapp.com/emojis/843076397345144863.png',
	winMessage: 'Congrats {winners}! you won `{prize}`!! Total `{totalParticipants}` members participated and your winning percentage was `{winPercentage}%`',
	rerolledMessage: 'Rerolled! {winner} is the new winner of the giveaway!',
	toParticipate: '**Click the Enter button to enter the giveaway!**',
	newParticipant: 'You have successfully entered for this giveaway! your win percentage is `{winPercentage}%` among `{totalParticipants}` other participants', // no placeholders | ephemeral
	alreadyParticipated: 'You already entered this giveaway!', 
	noParticipants: 'There are not enough people in the giveaway!',
	noRole: 'You do not have the required role(s)\n{requiredRoles}\n for the giveaway!',
	dmMessage: 'You have won a giveaway in **{guildName}**!\nPrize: [{prize}]({giveawayURL})',
	noWinner: 'Not enough people participated in this giveaway.', 
	alreadyEnded: 'The giveaway has already ended!',
	dropWin: '{winner} Won The Drop!!',
};

Nuggies.Messages(client, { giveawayOptions: defaultGiveawayMessages })
Nuggies.connect(mongoPath);
Nuggies.handleInteractions(client)
Nuggies.giveaways.startAgain(client);



client.vcclient = voiceClient; //Global Voice Leveling System Variable


client.commands = new Discord.Collection(); //Message Commands Collection



client.color = require('./colors.json') //Global Variable for Color JSON for ease of access to multiple colors


Levels.setURL(mongoPath); //Connection to the Mongo Database for Leveling System


module.exports = {afk, starboardcollection }; //Exporting Discord Collections for Usage Outside of Main File


const { Player } = require("discord-music-player"); //Import Music Player Client 

const player = new Player(client, {
  leaveOnEmpty: true,
  deafenOnJoin: true,
  timeout: 600000,
  volume: 100,
});



//Global Variable for Music Bot
client.player = player;

//Events for the Music Bot
player
  
  //Event for When Only Bot is Present in Voice Channel
  .on("channelEmpty", async (queue) => {
    queue.connection.leave();
    queue.data.channel.send("Left Channel as no one was with me");
  })

  //Event for when Music Queue is Manually Shut Down
  .on("queueDestroyed", async (queue) => {
    queue.connection.leave();
  })

  //Event for When Music Client is Manually Stopped/Destroyed
  .on('clientDisconnect',(queue) =>{
    queue.connection.leave();
  })

  //Event for the First Song in the Queue
  .on("songFirst", async(queue, song) => {
  try{
   if(song.isFirst){

    //Removes Tags from YouTube Music Videos
    if(song.name.includes("Official Video") || song.name.includes("Official Music Video") || song.name.includes("Official Audio")){
      const newname = song.name.replace("(Official Video)", "") || song.name.replace("(Official Music Video)", "") || song.name.replace("(Official Audio)", "")

        const embed = new Discord.MessageEmbed()
          .setColor(client.color.invis)
          .setTitle('**Now Playing**')
          .addField("Song Name: ", newname)
          .addField("Song Duration", song.duration, false)
          .setThumbnail(song.thumbnail)
          .setTimestamp()
        await queue.data.channel.send({embeds:[embed]})
    }
  

    else{
      const embed = new Discord.MessageEmbed()
        .setColor(client.color.invis)
        .addField("Song Name: ", song.name)
        .setTitle('**Now Playing**')
        .addField("Song Duration", song.duration, false)
        .setThumbnail(song.thumbnail)
        .setTimestamp()
      queue.data.channel.send({embeds:[embed]})
    }
  }
 }catch(err){
   queue.data.channel.send({content:'An Error Has Occurred'})
 }
    
  })


  //Event for When a YouTube or Spotify Playlist is added to the queue
  .on("playlist", async (raw, queue,requestedBy) => {
    const embed = new Discord.MessageEmbed()
      .setColor(client.color.invis)
      .setTitle('**Playlist Added**')
      .addField("Playlist Name: ", raw.name)
      .addField('Number of Songs', raw.songs)
      .addField("Song Duration", raw.duration, false)
      .setThumbnail(raw.thumbnail)
      .setTimestamp()
    await queue.data.channel.send({embeds:[embed]})

  })

  //Events for when a Song is Added to the queue
  .on("songAdd", async(queue, song) => {

try{

  if(!song.isFirst){
    if(song.name.includes("Official Video") || song.name.includes("Official Music Video") || song.name.includes("Official Audio")){
      const newname = song.name.replace("(Official Video)", "") ||song.name.replace("(Official Music Video)", "") || song.name.replace("(Official Audio)", "")

        const embed = new Discord.MessageEmbed()
        .setColor(client.color.invis)
        .setTitle('**Added Song to Queue**')
        .addField("Song Name: ", newname)
        .addField("Song Duration", song.duration, false)
        .setThumbnail(song.thumbnail)
        .setTimestamp()
        await queue.data.channel.send({embeds:[embed]})
    }

    else{
      const embed = new Discord.MessageEmbed()
        .setColor(client.color.invis)
        .addField("Song Name: ", song.name)
        .setTitle('**Added Song to Queue**')
        .addField("Song Duration", song.duration, false)
        .setThumbnail(song.thumbnail)
        .setTimestamp()
        await queue.data.channel.send({embeds:[embed]})
    }
    }
   }catch(err){
    queue.data.channel.send({content:'An Error Has Occured'})
   }
  })
//End Of Music Bot Stuff


//Embed Generator that makes Embeds easier to use
client.embed = async (message, options) => {
  const embed = new Discord.MessageEmbed(options);
  message.channel.send({ embeds: [embed] });
};


//Ready Event
client.on("ready", async () => {

  /* Just a Bunch of Decorative Stuff for my terminal */
  const data = [
    ["LOGGED IN AS", `${red(client.user.tag)}`, "The bot that I am logged in as."],
    ["SERVERS", `${yellow(client.guilds.cache.size.toLocaleString())}`, "The amount of servers that I am in."],
    ["USERS", `${green(client.users.cache.size.toLocaleString())}`, "The amount of users using my commands."],
    ["COMMANDS", `${cyan(client.commands.size.toLocaleString())}`, "Commands Loaded"]
  ]
  
  //Table Setup for my Terminal
  const config = {
    border: {
      topBody: `─`,
      topJoin: `┬`,
      topLeft: `┌`,
      topRight: `┐`,
  
      bottomBody: `─`,
      bottomJoin: `┴`,
      bottomLeft: `└`,
      bottomRight: `┘`,
  
      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,
  
      joinBody: `─`,
      joinLeft: `├`,
      joinRight: `┤`,
      joinJoin: `┼`
    }, 
    header: {
      alignment: 'center',
      content: "CLIENT DATA"
    }
  };
  console.log(table(data, config))
  console.log(botname);

  //Random Ascii Art
  const loading = String.raw`
  __         ______   __    __  __    __   ______   __    __  ______  __    __   ______  
 /  |       /      \ /  |  /  |/  \  /  | /      \ /  |  /  |/      |/  \  /  | /      \ 
 $$ |      /$$$$$$  |$$ |  $$ |$$  \ $$ |/$$$$$$  |$$ |  $$ |$$$$$$/ $$  \ $$ |/$$$$$$  |
 $$ |      $$ |__$$ |$$ |  $$ |$$$  \$$ |$$ |  $$/ $$ |__$$ |  $$ |  $$$  \$$ |$$ | _$$/ 
 $$ |      $$    $$ |$$ |  $$ |$$$$  $$ |$$ |      $$    $$ |  $$ |  $$$$  $$ |$$ |/    |
 $$ |      $$$$$$$$ |$$ |  $$ |$$ $$ $$ |$$ |   __ $$$$$$$$ |  $$ |  $$ $$ $$ |$$ |$$$$ |
 $$ |_____ $$ |  $$ |$$ \__$$ |$$ |$$$$ |$$ \__/  |$$ |  $$ | _$$ |_ $$ |$$$$ |$$ \__$$ |
 $$       |$$ |  $$ |$$    $$/ $$ | $$$ |$$    $$/ $$ |  $$ |/ $$   |$$ | $$$ |$$    $$/ 
 $$$$$$$$/ $$/   $$/  $$$$$$/  $$/   $$/  $$$$$$/  $$/   $$/ $$$$$$/ $$/   $$/  $$$$$$/  
                                                                                                                                                                                      
`;
  try {
    let slash = [];
    let table = new ascii("Slash commands");
    console.log("Slash Commands Loaded");
    console.log(red(`Starting ${client.user.tag}, hold on ...`))
    console.log(red(loading))
    const prefix = "!necro";
    console.log(``);
    console.log(green(`                                                    An Ok Bot`));
    console.log(``);
    console.log(``);
    console.log(yellow('               + ================================================================================== +'));
    console.log(cyan(`                                [i] :: ${prefix} help       :: Displays commands.                   `));
    console.log(cyan(`                                [i] :: /help                :: Displays slash commands                `));
    console.log(yellow('               + ================================Commands========================================== +'));
    console.log(cyan(`                       Author   [i] :: Programmed by [Arihant Tripathi]    :: © 2021 Necro Development                   `));
    console.log(cyan(`                       Bot info [i] :: Status                       :: ✅ Online                           `));
    console.log(cyan(`                       Users    [i] ::                              :: ${client.users.cache.size}  Users   `));
    console.log(cyan(`                       Guilds   [i] ::                              :: ${client.guilds.cache.size} Guilds  `));


    
console.log(red("Press [CTRL + C] to stop the Terminal ..."))


//Slash Command Registration
fs.readdirSync("./slashcmd/").forEach((dir) => {

      //Read From Files in Slash Command Directory
      const commands = fs
        .readdirSync(`./slashcmd/${dir}/`)
        .filter((file) => file.endsWith(".js"));

      //Loop through each file and load
      for (let file of commands) {
        let pull = require(`./slashcmd/${dir}/${file}`);

        //Condition to Make Sure Slash Command has a name set to it
        if (pull.name) {

          //Set SlashCommands to Collection
          client.slashCommands.set(pull.name, pull);
          slash.push(pull);  //Push Files to Slash Command Array
          table.addRow(file, "✅"); //Add a Check for Each Slash Command Registered
        } else {
          table.addRow(file, `❌  -> missing command parameters`); //Add a X for Each Slash Command Missing
          continue;
        }
      }
    });
    console.log(table.toString()); //Log the Table in Terminal
    await client.application.commands.set(slash); //Register the slash commands
  } catch (error) {
    console.log(error);
  }


  //Mongo Database Registration
  await mongoose
    .connect(mongoPath, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
    })
    .then(console.log("Connected to Mongo")); //Prompt when Connection to Mongo is Successful

  if (!mongoPath) return; //If Mongo Path is not set, continue


   blacklistWords.find().then((documents)=>{
     documents.forEach((doc)=>{
       client.filters.set(doc.Guild, doc.Words);
       client.filtersLog.set(doc.Guild, doc.Words)
     })
   })





  

  //Member Count Channel Registration
  setInterval(() => {
    countSchema.find().then((data) => {
      if (!data && !data.length) return;
      data.forEach((value) => {
        const guild = client.guilds.cache.get(value.Guild); // Retrieve Server From Databse
        const memberCount = guild.memberCount; //Retrieve Current Server Member Count
        if (value.Member != memberCount) { //If Member Count is not equal to the one in the Database
          const channel = guild.channels.cache.get(value.Channel); //Retrieve Channel from Database

          channel.setName(`Members: ${memberCount}`); //Update Member Count

          value.Member = memberCount; //Update Member Count in Database
          value.save(); 
        }
      });
    });
  }, ms("15 Minutes"));


  //Bot Activity List
  const arrayOfStatus = [
    `Multi-Purpose Bot`,
    `Watching Over Everyone`,
    `run !necro`,
    "/help for slash commands",
  ];


  //Changinging Bot Status Randomly Every 5 Seconds
  let index = 0;
  setInterval(() => {
    if (index == arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    client.user.setActivity('Helping Out', { type: 'WATCHING' }); //Set to Watching Prescence
    client.user.setPresence({ activities: [{ name: status }], status: 'dnd' }); //Set Do Not Disturb Status
    index++;
  }, 5000);
});

client.once("disconnect", () => {
  console.log("Disconnect");
});

//RPC Token for Local Usage
// rpc.on('ready', () => {
//     rpc.setActivity({
//         details: 'Working',
//         state: 'Working on stuff',
//         startTimestamp: new Date(),
//         largeImageKey: 'large-key',
//         largeImageText: 'Grind Season',
//         smallImageKey: 'small-key',
//         smallImageText: 'Chilling',
//         buttons: [{label : 'Github', url : 'https://github.com/Siris2314'},{label : 'Invite My Bot', url : 'https://dsc.gg/necroatomic'}]
//     });

//     console.log('RPC online');
// });

// rpc.login({
//     clientId: rpctoken
// });


//Welcome Image Creation for The Welcome Image System
var welcome = {};
welcome.create = Canvas.createCanvas(1024, 500); //Uses Canvas to Create a 1024x500 Image
welcome.context = welcome.create.getContext("2d"); //Set the Image Context to 2d, so we can create the image
welcome.context.font = "72px sans-serif"; //Setting Font on Image
welcome.context.fillStyle = "#ffffff"; //Setting the Font Color Style

Canvas.loadImage("./assets/background.jpg").then(async (img) => { //Read the Background image from the assets folder 

  /*
  * Drawing on the Background Image itself, making sure there is space to draw the avatar of the user joining and the text on top of the image
  * Fills in the color and font set earlier on the image
  */
  welcome.context.drawImage(img, 0, 0, 1024, 500); 
  welcome.context.fillText("Welcome", 360, 360);
  welcome.context.beginPath();
  welcome.context.arc(512, 166, 128, 0, Math.PI * 2, true);
  welcome.context.fill();
});


//Anti-Crash System that I use from time to time
// process.on("unhandledRejection", (reason, p) => {
//     console.log(" [antiCrash] :: Unhandled Rejection/Catch");
//     // console.log(reason, p);
// });
// process.on("uncaughtException", (err, origin) => {
//     console.log(" [antiCrash] :: Uncaught Exception/Catch");
//     // console.log(err, origin);
// });
// process.on("uncaughtExceptionMonitor", (err, origin) => {
//     console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
//     // console.log(err, origin);
// });
// process.on("multipleResolves", (type, promise, reason) => {
//     console.log(" [antiCrash] :: Multiple Resolves");
//     // console.log(type, promise, reason);
// });


//Message Event
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) {
    return;
  }

  //Not Quite Nitro System

  //Random Function that Helps With Getting Ids of Emojis a lot of easier
  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 


  //Check to see if the message content itself is an emoji, hence starts and ends with a :

if(message.content.startsWith(':') && message.content.endsWith(':')){
  let emojis = message.content.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;
  emojis.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(message.content)) message.content = message.content.replace(new RegExp(temp, "g"), emoji.toString())
    else message.content = message.content.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })

  if (message.content === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find(x => x.name === "NQN" + number);

  if (!webhook) {
    webhook = await message.channel.createWebhook(`NQN` + number, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })

  message.delete().catch(err => { })
  webhook.send(message.content).catch(err => { })

  await webhook.edit({
    name: `NQN` + number,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })
}

  //User Message Level System
  const randomXP = Math.floor(Math.random() * 29) + 1; //Random XP Value between 1 and 29 that will be given on each message sent by a user in the server
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXP
  ); //Appends and Saves XP to the Database Upon Each User Leveling Up

  const messageContent = message.content.toLowerCase().split(" ")
  

  const blacklistchecker = await blacklistWords.findOne({Guild:message.guild.id})
  const filter = client.filters.get(message.guild.id) || "No Filter"
  if(!filter){
   
  }
  const wordsUsed = [];

  let shouldDelete = false;

  messageContent.forEach((word) => {
    if(filter.includes(word)){
      wordsUsed.push(word);
      shouldDelete = true;
    }
    else{
      
    }

  })

  if(shouldDelete){
      message.delete().catch(()=> {})
  }

  if(wordsUsed.length > 0){
    const channelID = blacklistchecker.Log ? blacklistchecker.Log : "No Log"
    console.log(channelID)
    if(!channelID || channelID == "No Log"){
      //Do Nothing
    }
    const channelObject = message.guild.channels.cache.get(channelID) ? message.guild.channels.cache.get(channelID) : "No Channel"
    console.log(channelObject)
    if(!channelObject || channelObject == "No Channel"){
      //Do Nothing
    }
    else{

    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setDescription([
        `Used ${wordsUsed.length} blacklisted word(s) in the message: ${message.channel} => `,
        `\`${wordsUsed.map((w) => w)}\``,
      ].join("\n"))

      channelObject.send({embeds:[embed]})
    }
  }




  


  //FxTwitter System for a Personal Server
  if (
    message.content.includes("https://twitter.com/") &&
    message.guild.id === "684462232679219242"
  ) {
    message.delete();
    let str = message.content.replace("https://twitter.com/", "");
    let newstr = `https://fxtwitter.com/${str}`;

    message.channel.send({ content: newstr });
  }

  //Anti-Scam Link System that uses a Database to Retrieve Punishments Set by Admins for Sending Scam Links
  await antiscam.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return; //If Anti-Scam Link was not set, do nothing
 
    const punishment = String(data.Punishment); //Get The Punishment Set by the Admin

    //Loop Through the JSON File of UnSafe Links and see if any user has sent them
    unsafe.forEach(async (item) => {
      if (message.content === item || message.content.startsWith(item)) {

        message.delete(); //Remove The Message Immediately if done so

        const Member = await message.guild.members.fetch(message.author.id); //Find the Person who sent the message

        message.channel.send(`Scam link sent by ${message.author.username}`); //Alert in the channel itself who sent the scam link

        //If the punishment is to mute the user
        if (punishment === "mute") {
          const role = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === "muted"
          ); //Find Muted Role in the Server 

          //If no muted Role, create one
          if (!role) {
            try {
              message.channel.send({
                content:
                  "Muted role is not found, attempting to create muted role.",
              });

              let muterole = await message.guild.roles.create({
                data: {
                  name: "muted",
                  permissions: [],
                },
              });
              message.guild.channels.cache
                .filter((c) => c.type === "text")
                .forEach(async (channel, id) => {
                  await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                  });
                }); //Set Muted Perms, to allow the user to not send messages and react to messages in all text channels
              message.channel.send({
                content: "Muted role has sucessfully been created.",
              });
            } catch (error) {
              console.log(error);
            }
          }

          //Find the Muted Role in the Server
          let role2 = message.guild.roles.cache.find(
            (r) => r.name.toLowerCase() === "muted"
          );

          //If the User has already been muted, do nothing, send message that they are already muted
          if (Member.roles.cache.has(role2.id))
            return message.channel.send({
              content: `${Member.displayName} has already been muted.`,
            });

          //Else Give User Muted role, hence muting them
          await Member.roles.add(role2);

        } 
        //If the punshment is to warn the user
        else if (punishment === "warn") {

          //Set Reason for Warning
          const reason = "Sending Scam Links";

          //Send the Warning to the User
          Member.send({
            embeds: [
              new MessageEmbed()
                .setTitle("You Have Been Warned")
                .setDescription(`${reason}`),
            ],
          });
        } 
        //If the punishment is to ban the user
        else if (punishment === "ban") {
          Member.ban({ reason: "Sending Scam Links" }); //Ban the User, with reasoning of Sending Scam Links

          //Send a more detailed explanation to user
          Member.send({
            embeds: [
              new MessageEmbed()
                .setTitle(`You Have Been Banned from ${message.guild.name}`)
                .setDescription(`Sending Scam Links`),
            ],
          });
        
      } 
       //If the punishment is to kick the user
        else if (punishment === "kick") {
          Member.kick({ reason: "Sending Scam Links" }); //Kick the User, with reasoning of Sending Scam Links

          //Send a more detailed explanation to user
          Member.send({
            embeds: [
              new MessageEmbed()
                .setTitle(`You Have Been Kicked from ${message.guild.name}`)
                .setDescription(`Sending Scam Links`),
            ],
          });
        }
      }
    });
  });



  //Anti-Invite System
  await inviteschema.findOne(
    { Server: message.guild.id },
    async (err, data) => {
      if (!data) return; //If No Invite System is set, do nothing

      //Find Server that is Stored in Database
      if (data.Server === message.guild.id) {

        const InviteLinks = [
          "discord.gg/",
          "discord.com/invite/",
          "discordapp.com/invite/",
        ]; //Types of Discord Server Invite Links

        //Check to see if one of the Invite Links is in the message
        if (
          InviteLinks.some((link) =>
            message.content.toLowerCase().includes(link)
          )
        ) {

          //Decode the User code out of the Invite Link
          const UserCode = message.content.split(
            "discord.gg/" || "discord.com/invite/" || "discordapp.com/invite/"
          )[1];

          //Fetch Invites Sent in the Server
          message.guild.fetchInvites().then((invites) => {
            let InviteArray = [];
            for (let inviteCode of invites) {
              InviteArray.push(inviteCode[0]);
            }

            //Check to see if the User Code is in the Invite Array, if it is, do nothing, if not its an outside server Invite
            if (!InviteArray.includes(UserCode)) {

              message.delete(); //Delete The Message Upon Getting An Outside Server Invite

              return message.channel.send({
                content: "Please do not send links to other servers",
              });
            }
          });
        }
      }
    }
  );



  //Counting game system, that tracks the current number via a Database
  await counterSchema.findOne(
    { Guild: message.guild.id },
    async (err, data) => {

      //If No Counting Game is Set, Do Nothing
      if (data == null) return;

      if (message.channel.id !== data.Channel) return;

      let number = parseInt(message.content); //Convert the current Message from a String to an Integer

      let current = parseInt(data.Count); //Convert the Current Number from a String to an Integer

      if (!isNaN(number)) { 

        if (message.author.id == data.UserID) { //If the next Number sent is by the same user

          data.Count = 0; //Reset Game to 0

          await data.save(); //Save Data in Database

          message.react("❌"); //React with Error

          data.UserID = null; //Reset User ID in Database to Null

          await data.save(); //Save Data in Database

          return message.channel.send({
            content: `${message.author.username} has messed it up, stopped at ${
              number - 1
            } ,resetting game to start at 1`,
          }); 
        } else { //Different User Sent a Number
          if (number == current + 1) { //Checks to see if number sent is one greater than the current number
            data.Count = data.Count + 1; //Set the new number in the database
            data.UserID = message.author.id; //Set the user's ID to the database
            await data.save(); 
            message.react("✅"); //React with Success
          } 
          
          else { //Number Sent is not one greater than the current number
            data.Count = 0; //Reset Game to 0
            data.UserID = null; //Reset User ID in Database
            await data.save();
            message.react("❌"); 
            message.channel.send({
              content: `${message.author.username} has messed it up, stopped at ${current} ,resetting game to start at 1`,
            });
          }
        }
      }
    }
  );



  //Ghost Ping Detector
  await ghostpingschema.findOne(
    { Guild: message.guild.id },
    async (err, data) => {
      //If System is not enabled, do nothig
      if (!data || data.Guild == null) return;

      //If no user is ping, do nothing
      if (!message.mentions.members.first()) return;

      //If the user pings itself, do nothing
      if (message.mentions.members.first().id === message.author.id) return;

      //Ghost Ping Timer
      const time = 50000;

      //Set the GhostPing into the Ghost-Ping Collection, with the ID of user who pinged
      if (message.guild.id === data.Guild) {
        Pings.set(
          `pinged:${message.mentions.members.first().id}`,
          Date.now() + time
        ); 
        
        //Delete the Ghost-Ping after the timer has passed
        setTimeout(() => {
          Pings.delete(`pinged:${message.mentions.members.first().id}`);
        }, time); 
      }
    }
  );
  
  //Anti-NSFW System
  if (message.attachments.first()) {

    /* 
      Function that uses Neural Networks to determine if an image is NSFW.
      Further classification of image is done via tensorflow using neural networks to determine if an Image is NSFW.
    */
    async function isnsfw(url) {
      let r = false;
    const pic = await axios.get(url, {
      responseType: 'arraybuffer',
    })
    const model = await nsfw.load() //Load NSFW Classification Model
    const image = await tf.node.decodeImage(pic.data,3) //Decode Image into Multiple Neural Network Nodes
    const predictions = await model.classify(image)

    image.dispose()


    predictions.map((pr) => {   //Make a probability map to determine if an image is NSFW
      pr.probability = Math.round(pr.probability * 100)
      console.log(pr.className, pr.probability)
      if(pr.className == "Hentai" && pr.probability > 30) {
        r = true
      }
      if(pr.className == "Porn"  && pr.probability > 30){
        r = true
      }
     if(pr.className == "Sexy"  && pr.probability > 80){
        r = true
      }
   
    })
    return r;
  }
    await nsfwschema.findOne(
      { Server: message.guild.id },
      async (err, data) => {

        //If No NSFW System is Set, Do Nothing
        if (!data || !data.Server == null) return;
 
        const image = message.attachments.first().url; //Get the first image sent in the channel by a user

         let r = isnsfw(image); //Check if the image is NSFW

         if(r == true){
            await message.delete();
            return message.channel.send({content: "Please do not send NSFW content"});
         }
      }
    );
  }


  //Chatbot System with Database Implementation
  await chatschema.findOne({ Guild: message.guild.id }, async (err, data) => {

    //If No Chatbot System is Set, Do Nothing
    if (!data) return;

    
    if (message.channel.id !== data.Channel) return;

    //Method that makes it look like the bot is typing
    message.channel.sendTyping();

    //Fetch the Chatbot API
    fetch(
      `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
        message.content
      )}&botname=${client.user.username}&ownername=EndofLeTime#6747`
    )
      .then((res) => res.json())
      .then((data) => {
        //Reply with the chatbot API message
        message.reply(`${data.message}`);
      });
  });



  //AFK System, this one prompts when a user is in AFK mode and types in a message
  afkschema.findOne(
    { Guild: message.guild.id, Member: message.author.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {

        //If user data exists in Database, delete it
        data.delete();
        const afk = new Discord.MessageEmbed()
          .setTitle("Afk Removed")
          .setDescription(`${message.author.tag} afk has been removed`)
          .setFooter(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp();

        message.channel.send({ embeds: [afk] });
      } else {
        return;
      }
    }
  );
  
  //AFK System, this one prompts when a user is in AFK mode and is pinged by another user
  if (message.mentions.members.first()) {
    afkschema.findOne(
      { Guild: message.guild.id, Member: message.mentions.members.first().id },
      async (err, data) => {
        if (err) throw err;

        if (!data) return; //If user data does not exist in Database, do nothing
        
        
        if (data) {
          const member = message.guild.members.cache.get(data.Member); //Get the member who is AFK via the bot's cache
          const afk = new Discord.MessageEmbed()
            .setTitle(`${member.user.tag} is Afk`)
            .setDescription(
              `${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`
            )
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp();

          message.channel.send({ embeds: [afk] });
        } else return;
      }
    );
  }


  //Custom Prefix System
  const settings = await guildSchema.findOne(
    {
      guildID: message.guild.id,
    },
    (err, guild) => {
      if (err) console.error(err);
      if (!guild) { //If a server does not exist in the database
        const newGuild = new guildSchema({
          _id: mongoose.Types.ObjectId(),
          guildID: message.guild.id, //Set the server's ID to the database
          guildName: message.guild.name,  //Set the server's name to the database
          prefix: process.env.prefix, //Set the default prefix to the database
        });
        newGuild
          .save() //Save Data to the database
          .then((result) => console.log(result))
          .catch((err) => console.error(err));

        return message.channel
          .send({
            content:
              "This server was not in our database! We have now added and you should be able to use bot commands.",
          })
          .then((m) => m.delete({ timeout: 10000 }));
      }
    }
  );

  var prefix = "";
  try {
    prefix = settings.prefix || process.env.prefix; //Set the bot prefix to the custom one set, or the default one
  } catch (err) {
    return message.channel
      .send({
        content:
          "This server was not in our database! We have now added and you should be able to use bot commands.",
      })
      .then((m) => m.delete({ timeout: 10000 }));
  }


  //Bot Ping System
  try {
    if (message.mentions.has(client.user.id) && !message.mentions.everyone) { //If a user pings the bot and it is not an @everyone ping
      client.embed(message, {
        title: `Greetings ${message.author.username}`,
        description: `Your prefix in this server is **${prefix}**\n\n To get started you can do **${prefix} help**\n\n To use slash commands, simply type in /help`,
        color: "BLUE",
        thumbnail: {
          url: message.author.client.user.displayAvatarURL({ dynamic: true }),
        },
        footer: {
          text: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
        },
        timestamp: Date.now(),
      });
    }
  } catch (err) {}


  if (!message.content.startsWith(prefix)) return; //Does not run commands if prefix not given







  //Registering Message Commands
  const args = message.content.slice(prefix.length).trim().split(/ +/); //Register Arguments to prevent mixup with bot prefix

  const command = args.shift().toLowerCase(); //Register Command itself
   
  var getDirectories = function (src, callback) {
    glob(src + "/**/*", callback);
  }; //Get Each Sub Directory in Commands Folder


  //Get Each Command File in the Sub-Directory
  getDirectories("./commands", async function (err, res) {
    if (err) {
      console.log(err);
    } else {
      var commandFiles = []; //Array of Command Files
      commandFiles = res.filter((v, i) => v.endsWith(".js")); //Filter out all non-js files

      //Register each command file into Command Collection
      for (const file of commandFiles) {
        const command = require(file);
        client.commands.set(command.name, command);
      }

      //If a command is not registered, do nothing
      if (!client.commands.has(command)) {
        return;
      }

      try {
        //Running each command using execute function
        client.commands.get(command).execute(message, args, client);
      } catch (error) {
        console.error(error);
        message.reply("Issue loading command");
      }

      //Bot Blacklist System
      if (command) {
        const blacklisted = await blacklistserver.findOne({
          Server: message.guild.id,
        }); 

        if (blacklisted) //Checks to see if server is blacklisted from using bot commands
          return message.channel.send({
            content: "Cannot use commands as owner has blacklisted this server",
          });
        const channel = client.channels.cache.get("935287575441199224"); //Personal Command Usage Checker, for bug testing purposes

        channel.send(
          `**${message.author.tag}** has used ${command} command in **${message.guild.name}**`
        );
      }
    }
  });
});


//Server Member Join Event
client.on("guildMemberAdd", async (member) => {

  //Welcome Message, Currently Made for a specific server, will add custom message later
  await welcomeMessage.findOne({Guild:member.guild.id}, async (err, data)=>{

    //If Server Message System is not enabled, do nothing
    if(!data) return;

    const channel = client.channels.cache.get(data.Channel); //Retrieves Channel to Send Welcome Message In
    const rulesChannel = client.channels.cache.get(data.RulesChannel); //Retrieves the Rules Channel
    const rolesChannel = client.channels.cache.get(data.RolesChannel); //Retrieves the Roles Channel
    const modTag = member.guild.roles.cache.get(data.ModeratorTag); //Retrieves the Moderator Tag
    const adminTag = member.guild.roles.cache.get(data.AdminTag); //Retrives the Admin Tag



    if(channel != null){

      await channel.send({content: `Hello ${member.user.username} and welcome to ${member.guild.name}! Be sure to read ${rulesChannel} and click on 🌱 at the bottom left to access the rest of the server. Then head over to ${rolesChannel} and tag yourself with the games you play. If you have any questions, please message ${adminTag} or our mods ${modTag}. Enjoy your times among the Beans!`})
     
    }
    


  })


  //captcha verification
  await captchaSchema.findOne({ Guild: member.guild.id }, async (err, data) => {

    //If Captcha System is not enabled, do nothing
    if (!data) return;

    
    const captcha = new Captcha(); //New Captcha Object

    /*
      Draws Captcha with the following parameters
    */
    captcha.async = true;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha();

    const attachment = new Discord.MessageAttachment(
      await captcha.png,
      "captcha.png"
    );

    //Sends Captcha to the user upon them joining the server
    const msg = await member.send({
      files: [attachment],
      content:
        "Please answer the following Captcha to make sure you are not a bot",
    });


    //Retrieves the Role that the Admin had set for Captcha System
    const role = member.guild.roles.cache.get(data.Role);


    //Checks to see if the captcha was answered correctly
    const filter = (message) => {
      if (message.author.id !== member.id) return;
      if (message.content == captcha.text) return true;
      else member.send(`:x: Wrong Captcha Answer`);
    };

    //Message Collector to Collect User Input 
    const collector = await msg.channel.awaitMessages({
      filter,
      max: 1,
      time: 60000,
      errors: ["time"],
    });

    //If the captcha was answered correctly, add the role to the user
    if (collector) {
      member.roles.add(role);
      member.send(`Thank you for verifying, welcome to ${member.guild.name}`);
    }
  });

  //Welcome Image
  Schema.findOne({ Guild: member.guild.id }, async (e, data) => {

    //If welcome system was not set, do nothing
    if (!data) return;

  
    const user = member.user;


    //Retrieves the Welcome Image that was drawn earlier in code
    let canvas = welcome;
    (canvas.context.font = "42px sans-serif"),
      (canvas.context.textAlign = "center"),
      canvas.context.fillText(user.username, 512, 410); //Fills Text Section with Username of the User joining the server
    canvas.context.font = "32px sans-serif"; //Sets Font for Text
    canvas.context.fillText(
      `The ${member.guild.memberCount}th member to join this server`, //Fills Text Section with the position of the new member
      512,
      455
    );
    canvas.context.beginPath(); //Begin Draw Path
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true); //Draws a circular shape equivalent to the size of a discord avatar
    canvas.context.closePath(); //Closes the Draw Path
    canvas.context.clip();
    await Canvas.loadImage(
      user.displayAvatarURL({ dynamic: false, format: "png", size: 1024 }) //Load the new member avatar image
    ).then((img) => {
      canvas.context.drawImage(img, 393, 47, 238, 238); //Draws the new member avatar image onto the welcome image
    });

    let image = new Discord.MessageAttachment(
      canvas.create.toBuffer(),
      `Welcome.png`
    );

    try {
      const channel = client.channels.cache.get(data.Channel); //Find the channel to send the Welcome Image to
      channel.send({ files: [image] });
    } catch (err) {
      console.log(err);
    }
  });

  customSchema.findOne({Guild:member.guild.id}, async(err, data)=>{
      if(!data) return;


      const channel = client.channels.cache.get(data.Channel);

  
      const background = data.Background;
      const greetings = data.Greetings;
      const message = data.Message ? data.Message : '';
      const greetcolor = data.GreetColor ? data.GreetColor : '';
      const messagecolor = data.messageColor ? data.messageColor : '';
      const namecolor = data.NameColor ? data.NameColor : '';
      const avatarcolor = data.AvatarColor ? data.AvatarColor : '';
      const font = data.font ? data.font : '';

      let image = ''

      console.log(member.user.avatarURL({dynamic:false, format:'png'}))
      image = await weeby.custom.greeting(member.user.avatarURL({dynamic:false, format:'png'}),background ,member.user.username, greetings, message, greetcolor, namecolor, avatarcolor,messagecolor, font)
        .then(img => {
          
        const attachment = new Discord.MessageAttachment(
          await (img),
          "greetings.png"
        );
          
          channel.send({files:[attachment]})

    })



  })

  //Mute System
  const data = await muteschema.findOne({ Guild: member.guild.id }); //Check to see if mute system is enabled

  if (!data) return; //If mute system is not enabled, do nothing

  const user = data.Users.findIndex((prop) => prop === member.id); //Find the user in the mute system

  if (user == -1) return; //If user is not in the mute system, do nothing

  const role = member.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === "muted"
  ); //Find Muted Role

  member.roles.add(role.id); //When user joins server back and was muted, add the muted role back to the user
  

  //Auto-Role System that auto adds a role upon a new member joining a server
  autoroleschema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return; //IF Auto-Role System is not enabled, do nothing

    const role = member.guild.roles.cache.get(data.Role); //Find Role in Database

    member.roles.add(role);
  });

  //Anti-Raid System
  antiraid.findOne({ Guild: member.guild.id }, async (err, data) => {
    const kickReason = "Anti-raidmode activated"; //Set Kick Reason when Server Raid occurs

    if (!data) return; //If Anti-Raid System is not enabled, do nothing

    if (data) {
      try {
        member.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle(`Server Under Lockdown`)
              .setDescription(
                `You have been kicked from **${member.guild.name}** with reason: **${kickReason}**`
              )
              .setColor("RED"),
          ],
        });
      } catch (e) {
        throw e;
      }
      member.kick(kickReason); //Kick Member as soon as they join the server, when this system is enabled
    }
  });


  //Anti-Alt System
  altschema.findOne({ Guild: member.guild.id }, async (err, data) => {

    //If Anti-Alt System is not enabled, do nothing
    if (!data) return;

    const days = data.Days; //Number of Days Since Account Creation to Check for
    const option = data.Option; //Action to Take Upon Alt Account Detection

    const channel = member.guild.channels.cache.get(data.Channel); //Find Channel to Send Alt Account Warning to

    const timeSpan = ms(`${days} days`); //Convert Days to Milliseconds

    const createdAt = new Date(member.user.createdAt).getTime(); //Get the joined Member's Account Creation Date
    const difference = Date.now() - createdAt; //Find the difference between the current date and the joined Member's Account Creation Date


    //If the time span set for alt account detection is greater than the difference between the current date and the joined Member's Account Creation Date, proc the Alt Account System
    if (difference < timeSpan) {
      member.send("Alt Account Detected");

      //If the punishment is to kick the user
      if (option.toLowerCase() == "kick") {
        const id = member.id;
        await member.kick();

        channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle("Alt Account Detected(Kick Option)")
              .setDescription(
                `Member ${id}, Kicked due to detection of alt account - Account Age: ${createdAt}`
              )
              .setColor("RANDOM")
              .setTimestamp(),
          ],
        });
      }
      //If the punishment is to ban the user 
      else if (option.toLowerCase() == "ban") {
        const id = member.id;
        member.ban();

        channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle("Alt Account Detected(Ban Option)")
              .setDescription(
                `Member ${id}, Ban due to detection of alt account - Account Age: ${createdAt}`
              )
              .setColor("RANDOM")
              .setTimestamp(),
          ],
        });
      } 
      else {
        //Sends to the log channel a warning that an alt account has been detected
        channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle("Alt Account Detected(Warning)")
              .setDescription(
                `:warning: Alt Account has been detected - Account Age: ${createdAt}`
              )
              .setColor("RANDOM")
              .setTimestamp(),
          ],
        });
      }
    }
  });
});


//Message Delete Event
client.on("messageDelete", async (message) => {

  //Snipes Event, detects when a message has been deleted, and upon usage of snipe command, sets a snipe embed
  client.snipes.set(message.channel.id, {
    content: message.content, //Checks for Deleted Content
    author: message.author, //Checks for Who Deleted the Message Content
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null, //Checks to see if an image was deleted
  });


  //Ghostping Event, that triggers upon a Ghost Ping
  await ghostpingschema.findOne(
    { Guild: message.guild.id },
    async (err, data) => {

      //If Ghost Ping System is not enabled, do nothing
      if (!data) return;

      //If no user was mentioned, do nothing
      if (!message.mentions.members.first()) return;

      //Check to see if the collection has the Ghost Ping in it, if it does send the Ghost Ping Embed
      if (Pings.has(`pinged:${message.mentions.members.first().id}`)) {
        const embed = new Discord.MessageEmbed()
          .setTitle("Ghost Ping Detected")
          .addField("Author", message.author.username, false)
          .addField("Content", message.content, true)
          .setColor("RANDOM")
          .setFooter(
            message.author.username,
            `${message.author.displayAvatarURL({ dynamic: true })}`
          )
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      }
    }
  );
});


//New Guild Event for when bot joins a new servers
client.on("guildCreate", async (guild) => {

  //Find the Server's Owner ID
  const id = guild.ownerId;
  

  //Find the Bot's Banner Image
  let attachments = new Discord.MessageAttachment(banner, "banner.png");


  //Send a Welcome Message to the Owner of the Server
  client.users.fetch(id).then((user) => {
    user.send({
      content: `\`\`\`Greetings ${user.username}, thank you for inviting me to your server, I am NecroAtomicBot a multiple purpose bot built to serve all your Discord needs.\nMy default prefix is !necro to change it simply use **!necro** prefix <custom prefix> to change it. Thanks again for inviting me \`\`\``,
      files: [attachments],
    });
  });
});




//Interaction Command System
client.on("interactionCreate", async (interaction) => {

  //Slash Command Stuff
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});


    //Get the command name from the SlashCommand Collection
    const cmd = client.slashCommands.get(interaction.commandName);

    //Check to see if the command has a name
    if (!cmd)
      return interaction.followUp({
        content: "Error Interacting With Slash Commands",
      });
    
    //Check to see if a permission has been set on the command
    if (cmd.permission) {

      //Check Permission of Member using the command
      const authorPerms = interaction.channel.permissionsFor(
        interaction.member
      );

      //Check to see if the Member has the permission to use the command
      if (!authorPerms || !authorPerms.has(cmd.permission))
        return interaction.followUp({
          content: "You do not have perms to run this command",
        });
    }

    //Run Function to Run interaction commands
    cmd.run(client, interaction);
  }

  //Check to see if a command interaction is a Context Menu
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });

    //Get the command name from the Slash Collection
    const command = client.slashCommands.get(interaction.commandName);

    //Run Command
    if (command) command.run(client, interaction);
  }

  //Check to see if a command interaction is a Button
  if (interaction.isButton()) {


    if(interaction.customId == "pause"){
     let queue = client.player.getQueue(interaction.guild.id);

     if(!queue) return interaction.followUp({content:`No Songs Playing`})
      queue.setPaused(true);

      await interaction.deferReply({ ephemeral: true });

      
    }
    else if(interaction.customId == "resume"){

      let queue = client.player.getQueue(interaction.guild.id);
      if(!queue) return interaction.followUp({content:`No Songs Playing`})
      queue.setPaused(false);

      await interaction.deferReply({ ephemeral: true });

      
    }
    else if(interaction.customId == "skip"){

        
        let queue = client.player.getQueue(interaction.guild.id);

        if(!queue) return interaction.followUp({content:`No Songs Playing`})
        if(queue.songs.length == 1){
          await interaction.deferReply({ ephemeral: true });
          interaction.channel.send('Cannot Skip With Singular Song Queue')
        
        }
        else{
          queue.skip();
          interaction.channel.send({content:`Now Playing: ${queue.songs[1].name}`})
        }
    }

    /*
      The Following Code is for the Button Role Reaction System, that is currently still in development due to glitches.
    */
    
    //Retrieve Emoji from Button Component
    const emoji = interaction?.component?.emoji;

    //Find the Button Menu Through the Database
    const menu = await buttonrr.findOne({ message: interaction.message.id });


    //If no reaction menu is found, do nothing
    if (
      !menu ||
      menu.roles.length == 0 ||
      !menu.roles.some((v) => v.emoji === emoji.id || v.emoji === emoji.name)
    ) {
      return;
    }

    //Fetch Member who will use the Button
    const member = interaction.guild.members.cache.get(interaction.user.id);


    //Loop Through Role Menu and check for the emojis and roles
    menu.roles.forEach((v) => {

      //Get Each Role from the Menu
      const role = interaction.guild.members.cache.get(v.role);

      //If there is no emoji to match with a role, do nothing
      if ((v.emoji !== emoji.name && v.emoji !== emoji.id) || !role) {
        return;
      }

      //Check to see if the Member already has the role
      if (!member.roles.cache.has(role.id)) {
        member.roles
          .add(role)
          .then(() => {
            interaction.reply({
              content: `You have been given the role ${role.name}`,
              ephemeral: true,
            });
          })
          .catch((err) => {
            interaction.reply({
              content: `An error occured while giving you the role ${role.name}`,
              ephemeral: true,
            });
          });
      } 
      //If the Member already has the role, remove the role from them
      else {  
        member.roles
          .remove(role)
          .then(() => {
            interaction.reply({
              content: `You have been removed from the role ${role.name}`,
              ephemeral: true,
            });
          })
          .catch(() => {
            interaction.reply({
              content: `An Error Has Occurred`,
              ephemeral: true,
            });
          });
      }
    });
  }

  //Select Menu System for Select Menu Command Interactions
  if (interaction.isSelectMenu()) {


    /*

      The Following Code is for the Select Menu Role Reaction System
    */

    //Check to see if the ID of Select Menu matches with the Role Reaction ID
    if (interaction.customId !== "reaction-roles") {
      return;
    }

    await interaction.deferReply({ ephemeral: true });


    //Find the Role ID
    const roleId = interaction.values[0];


  
    const role = interaction.guild.roles.cache.get(roleId);


    //Find All the roles of the member who is reacting
    const allroles = interaction.member.roles;

    //Check to see if the Member already has the role
    const obtained = allroles.cache.has(roleId);


    //If the Member already has the role, remove the role from them
    if (obtained) {
      allroles.remove(roleId);
      interaction.followUp(`${role.name} has been removed from you`);
    }
    //If the Member does not already have the role, add the role to them
    else {
      allroles.add(roleId);
      interaction.followUp(`${role.name} has been given to you`);
    }
  }
});

//Event upon bot leaving a server
client.on("guildDelete", async (guild) => {
  //Delete the Server from the Database
  await guildSchema.findOne({ guildID: guild.id }, async (err, data) => {
    if (!data) return;
    data.delete();
  });
});


//Voice State Change event
client.on("voiceStateUpdate", async (oldState, newState) => {
  
  //Join to Create VC System
  const schema = await jointocreate.findOne({
    guildId: oldState.guild.id ||newState.guild.id,
  })

  if(!schema)return;


   if(newState?.channelId == schema?.channelId){
     const {guild, user, voice, id} = newState.member
     const parent = newState.channel?.parentId  
     const parentId = parent ? {parent} : {};
     
     const voicechannel = await guild.channels.create(`${user.username}'s Voice Channel`,{
       type:'GUILD_VOICE',
       ...parentId,
       permissionOverwrites:[
         {
           id: id,
           allow:["MANAGE_CHANNELS"]
         }
       ]
     });

     client.voicetemp.set(voicechannel.id, newState.member);
     voice.setChannel(voicechannel.id);


   }

   if(client.voicetemp.get(oldState.channelId) && !oldState.channel.members.size){
     oldState.channel.delete();
     return;
   }


  //VC Leveling System, that checks for when a member joins or leaves VC and calculates XP based on that
  voiceClient.startListener(oldState, newState);
});


//New Reaction to Messages Event
client.on("messageReactionAdd", async (reaction, user) => {

  //Starboard System
  const handleStarboard = async () => {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {

        //If there is starboard system is not set, do nothing
        if (data == null) return;

        //Retrieve Starboard Channel ID from Database
        const starboardchannel = data.Channel;

        //Retrieve Channel from Bot Cache
        const starboard = client.channels.cache.get(starboardchannel);

        //Fetch Last 100 Messages in the Starboard Channel
        const msgs = await starboard.messages.fetch({ limit: 100 });

        const existingMsg = msgs.find((msg) =>
          msg.embeds.length === 1
            ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
              ? true
              : false
            : false
        );

        //Counts and Updates the Number of Stars to a Channel
        if (existingMsg)
          existingMsg.edit(
            `${reaction.count} - ⭐ | ${reaction.message.channel}`
          );
        else {
          const embed = new Discord.MessageEmbed()
            .setAuthor(
              reaction.message.author.tag,
              reaction.message.author.displayAvatarURL()
            )
            .setDescription(
              `**[Jump to this message](${reaction.message.url})**\n\n${
                reaction.message.content || ""
              }\n`
            )
            .setFooter(
              reaction.message.id +
                " - " +
                new Date(reaction.message.createdTimestamp)
            );
          
          //Check to see if the starred message is an image
          if (reaction.message.attachments.array().length > 0) {
            embed.setImage(reaction.message.attachments.first().url);
          }

          //Send the Starred Content to Starboard Channel
          if (starboard)
            starboard.send(
              { content: `1 - ⭐ | ${reaction.message.channel}` },
              { embeds: [embed] }
            );
        }
      }
    );
  };

  //If the reacted message is a star, keep the loop going and allow for more reactions
  if (reaction.emoji.name === "⭐") {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {
        if (data == null) return;
        const starboardchannel = data.Channel;
        const starboard = client.channels.cache.get(starboardchannel);

        if (reaction.message.channel.id == starboard.id) return;
        if (reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
        } else handleStarboard();
      }
    );
  }

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  //Do not allow bot to react
  if (user.bot) return;
});


//Removing Reactions from Messages Event
client.on("messageReactionRemove", async (reaction, user) => {

  //Update to Starboard System, this time for removing stars
  const handleStarboard = async () => {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {
        //If starboard system was never enabled, do nothing
        if (data == null) return;

        //Retrieve Starboard Channel ID from Database
        const starboardchannel = data.Channel;

        //Retrieve Channel from Bot Cache
        const starboard = client.channels.cache.get(starboardchannel);

        //Fetch Last 100 Messages in the Starboard Channel
        const msgs = await starboard.messages.fetch({ limit: 100 });
        const existingMsg = msgs.find((msg) =>
          msg.embeds.length === 1
            ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
              ? true
              : false
            : false
        );

        //Set Star Count to 0 if all stars removed
        if (existingMsg) {
          if (reaction.count === 0) existingMsg.delete({ timeout: 2500 });
          else
            //Update the Star Count
            existingMsg.edit(
              `${reaction.count} - | ${reaction.message.channel}`
            );
        }
      }
    );
  };
  
  //Check to see if Reaction is a star
  if (reaction.emoji.name === "⭐") {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {
        if (data == null) return;
        const starboardchannel = data.Channel;
        const starboard = client.channels.cache.get(starboardchannel);

        if (reaction.message.channel.id == starboard.id) return;
        if (reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
        } else handleStarboard();
      }
    );
  }

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
});


//Modlogs System
logger(client);

require("./dashboard/server");

//Discord Login System
client.login(token);
