require("dotenv").config();
const token = process.env.token;
const mongoPath = process.env.mongoPath;
const mongoose = require("mongoose");
const nekoyasui = require("nekoyasui");
const background = './assets/background.jpg'
const youtube = process.env.youtube;
const botname = process.env.botname;
const colors = require('colors');
const logger = require('./logger')
const antiraid = require('./schemas/antiraid');
const ownerID = process.env.ownerid;
const SpotifyPlugin = require("@distube/spotify");
const {format} = require('./functions2')
const counterSchema = require("./schemas/count");
const key1 = process.env.key1;
const Discord = require("discord.js");
const path = require("path");
const starboardSchema = require("./schemas/starboard");
const modlogsSchema = require("./schemas/modlogs");
const voiceSchema = require("./schemas/customvoice");
const client = new Discord.Client({
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
    restTimeOffset: 0
});
const fs = require("fs");
const { GiveawaysManager } = require("discord-giveaways");
const afk = new Discord.Collection();
const moment = require("moment");
const Levels = require("discord-xp");
const glob = require("glob");


Levels.setURL(mongoPath);


const DisTube = require("distube");
const afkschema = require('./schemas/afk');
const music = new DisTube(client,  { searchSongs: 0,
    emitNewSongOnly: false,
    highWaterMark: 1024*1024*64,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    plugins: [new SpotifyPlugin({ parallel: true })],
    youtubeDL: true,
    updateYouTubeDL: true, });
const { MessageAttachment } = require("discord.js");
const { getPokemon } = require("./commands/fun/pokemon");
client.snipes = new Discord.Collection();
const canvas = require("discord-canvas");
const Schema = require("./schemas/welcomeChannel");
const guildSchema = require("./schemas/Guilds");
const reactionSchema = require("./schemas/reaction-roles");
const ms = require("ms");
const altschema = require('./schemas/anti-alt');
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client, {
    token: token
});
const disbut = require('discord-buttons')(client)
require('discord-slider')(client);
const rpctoken = process.env.rpc
const RPC = require('discord-rpc'); 
const rpc = new RPC.Client({transport: 'ipc'});

const countSchema = require("./schemas/member-count");
const autoroleschema = require("./schemas/autorole");
const blacklistserver = require("./schemas/blacklist-server")
const inviteschema = require("./schemas/anti-invite")
const blacklistedWords = new Discord.Collection();
const ghostpingschema = require("./schemas/ghostping")
const Pings = new Discord.Collection()
const { chatBot } = require("reconlx");
const chatschema = require("./schemas/chatbot-channel");
const muteschema = require("./schemas/mute")
const blacklistSchema = require("./schemas/blacklist");
const starboardcollection = new Discord.Collection();

module.exports = { blacklistedWords, afk, starboardcollection };

const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode == 2 ? "Server Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
music
    .on("connect", (queue) => {
        queue.textChannel.send(`Connected to ${queue.voiceChannel}`)
    })
    .on("disconnect", (queue) => {
        queue.textChannel.send(`Disconnected from ${queue.voiceChannel}`)
    })
    .on("playSong", (queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setDescription(
                `Playing: :notes: [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n${status(
                    queue
                )}`
            )
            .setColor("RANDOM")
            .setThumbnail(song.thumbnail);
        queue.textChannel.send(embed);
    })
    .on("addSong", (queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setDescription(
                    `Added: [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n${status(
                            queue
                )} to the queue`
             )
            .setColor("RANDOM")
            .setThumbnail(song.thumbnail);
        queue.textChannel.send(embed);
    })
    .on("addList", (queue, playlist) => {
        queue.textChannel.send(
            `Added \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs) to queue\n${status(queue)}`
        );
    })
    .on("playList", (queue, playlist) => {
        const embed = new Discord.MessageEmbed()
            .setDescription(
                `Play \`${playlist.name}\` playlist (${
                    playlist.songs.length
                } 
                }\`\n${status(queue)}`
            )
            .setColor("RANDOM")
            .setThumbnail(song.thumbnail);
        queue.textChannel.send(embed);
    })
    .on("initQueue", (queue) => {
        queue.autoplay = false;
        queue.volume = 100;
    })
    .on("empty", (queue) => {
        (queue.textChannel.send("Channel is empty. Leaving the channel"))
    })
    .on("error", (channel, error) => {
        channel.send(`An error has occured ${error}`);
    });
client.music = music;



client.commands = new Discord.Collection();
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermission: ["MANAGE_MESSAGES", "ADMINSTRATOR"],
        embedColor: "RANDOM",
        reaction: "🎁",
    },
});


client.embed = async(message, options) => {
    const embed = new Discord.MessageEmbed(options);
    message.channel.send(embed)
  }

client.on("ready", async () => {
    console.log(botname);
    console.log("Heroku Connected");



    await mongoose
        .connect(mongoPath, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(console.log("Connected to Mongo"));

    blacklistSchema.find().then((data) => {
        data.forEach((val) => {
            blacklistedWords.set(val.Guild, val.Words);
        });
    });
    setInterval(() => {
        countSchema.find().then((data) => {
            if (!data && !data.length) return;
            data.forEach((value) => {
                const guild = client.guilds.cache.get(value.Guild);
                const memberCount = guild.memberCount;
                if (value.Member != memberCount) {
                    console.log("Member count differs");
                    const channel = guild.channels.cache.get(value.Channel);

                    channel.setName(`Members: ${memberCount}`);

                    value.Member = memberCount;
                    value.save();
                }
            });
        });
    }, ms("15 Minutes"));

    const arrayOfStatus = [
        `${client.guilds.cache.size} servers`,
        `${client.channels.cache.size} channels`,
        `${client.users.cache.size} users`,
        `run !necro`,
    ];

    let index = 0;
    setInterval(() => {
        if (index == arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity(status);
        index++;
    }, 5000);



});



client.once("disconnect", () => {
    console.log("Disconnect");
});


// rpc.on('ready', () => {
//     rpc.setActivity({
//         details: 'Messing Around With Stuff', 
//         state: 'Working on stuff', 
//         startTimestamp: new Date(), 
//         largeImageKey: 'large-key', 
//         largeImageText: 'Doing Stuff Over Summer', 
//         smallImageKey: 'small-key', 
//         smallImageText: 'Chilling', 
//         buttons: [{label : 'Github', url : 'https://github.com/Siris2314'},{label : 'NPM', url : 'https://www.npmjs.com/~ari.dev'}] // you con delete the buttons 
//     });

//     console.log('RPC online');
// });

// rpc.login({
//     clientId: rpctoken 
// });





client.on("message", async (message) => {
    if (!message.guild || message.author.bot) {
        return;
    }

    function Check(str) {
        if (
            client.emojis.cache.find((emoji) => emoji.name === str) ||
            message.guild.emojis.cache.find((emoji) => emoji.name === str)
        ) {
            return true;
        } else {
            return false;
        }
    }
    if (message.content.startsWith(":") && message.content.endsWith(":")) {
        let EmojiName = message.content.slice(1, -1);

        if (Check(EmojiName) === true) {
            const channel = client.channels.cache.get(message.channel.id);
            try {
                let webhooks = await channel.fetchWebhooks();
                let webhook = webhooks.first();
                if (webhook === undefined || null || !webhook) {
                    let Created = channel
                        .createWebhook("Bloxiphy", {
                            avatar:
                                "https://cdn.discordapp.com/avatars/708580906880860171/a_229b573176f79643d7fa5f6f7d8aed63.gif?size=256",
                        })
                        .then(async (webhook) => {
                            const emoji =
                                client.emojis.cache.find((e) => e.name == EmojiName).id ||
                                message.guild.emojis.cache.find((e) => e.name === EmojiName).id;

                            await webhook.send(`${client.emojis.cache.get(emoji)}`, {
                                username: message.author.username,
                                avatarURL: message.author.avatarURL({ dynamic: true }),
                            });
                            message.delete();
                        });
                }

                const emoji =
                    client.emojis.cache.find((e) => e.name == EmojiName).id ||
                    message.guild.emojis.cache.find((e) => e.name === EmojiName).id;

                await webhook.send(`${client.emojis.cache.get(emoji)}`, {
                    username: message.author.username,
                    avatarURL: message.author.avatarURL({ dynamic: true }),
                });
                message.delete();
            } catch (error) {
                console.log(`Error :\n${error}`);
            }
        }
    }

    const randomXP = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);

    await inviteschema.findOne({Server: message.guild.id}, async(err, data) => {
        if(!data) return;
        if(data.Server === message.guild.id){
            
            const InviteLinks = ['discord.gg/','discord.com/invite/','discordapp.com/invite/']
    
            if(InviteLinks.some(link => message.content.toLowerCase().includes(link))){
                const UserCode = message.content.split('discord.gg/' || 'discord.com/invite/' || 'discordapp.com/invite/')[1]
                message.guild.fetchInvites().then(invites => {
                    let InviteArray = []
                    for(let inviteCode of invites){
                        InviteArray.push(inviteCode[0])
    
                    }
                    if(!InviteArray.includes(UserCode)){
                        message.delete()
                        return message.channel.send("Please do not send links to other servers")
                    }
                })
            }
        }
    })

    const splittedMsgs = message.content.split(" ");

    let deleting = false;

    await Promise.all(
        splittedMsgs.map((content) => {
            if (blacklistedWords.get(message.guild.id)?.includes(content.toLowerCase()))
                deleting = true;
        })
    );

    if (deleting) return message.delete();

    await counterSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data == null) return;
        if (message.channel.id !== data.Channel) return;

        let number = parseInt(message.content);
        let current = parseInt(data.Count);
        if (!isNaN(number)) {
            if (message.author.id == data.UserID) {
                data.Count = 0;
                await data.save();
                message.react("❌");
                data.UserID = null;
                await data.save();
                return message.channel.send(
                    `${message.author.username} has messed it up, stopped at ${
                        number - 1
                    } ,resetting game to start at 1`
                );
            } else {
                if (number == current + 1) {
                    data.Count = data.Count + 1;
                    data.UserID = message.author.id;
                    await data.save();
                    message.react("✅");
                } else {
                    data.Count = 0;
                    data.UserID = null;
                    await data.save();
                    message.react("❌");
                    message.channel.send(
                        `${message.author.username} has messed it up, stopped at ${current} ,resetting game to start at 1`
                    );
                }
            }
        }
    });


    await ghostpingschema.findOne({Guild:message.guild.id}, async(err,data)=>{
        if(!data || data.Guild == null) return;
        if(!message.mentions.members.first()) return;
        if(message.mentions.members.first().id === message.author.id) return;
        const time = 50000;

     
      if(message.guild.id === data.Guild){
        Pings.set(`pinged:${message.mentions.members.first().id}`,Date.now() + time)

        setTimeout(() => {
            Pings.delete(`pinged:${message.mentions.members.first().id}`)
        },time)
        }

    })

    await chatschema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;

        if (message.channel.id !== data.Channel) return;

        const master = await nekoyasui.search.user(message, ownerID);
        const channel = await nekoyasui.search.channel(message, data.Channel);
        if (!channel) return;
        if (!master) console.log("Rip Bozo");
        const bot = {
            name: message.client.user.username,
            birthdate: "10/24/2001",
            prefix: message.client.prefix,
            gender: "Genderless",
            description: "Omnipotent Bot",
            country: "Latveria",
            city: "Doomstadt",
        };
        const owner = {
            id: master.id,
            username: master.username,
            discriminator: master.discriminator,
            invite: "",
        };
        const res = await nekoyasui.chat(String(message.content), message.author.id, bot, owner);
        channel.send(res.cnt);
    });

   if(await afkschema.findOne({Guild:message.guild.id},{user: message.author.id})){
       let afkProfile = await afkschema.findOne({user: message.author.id})

       if(afkProfile){
      
        const user = await client.users.fetch(afkProfile.user).then(async (u) => {
            const image = u.displayAvatarURL({dynamic:true})
            
            await client.embed(message,{ 
     
                 title:'AFK Removed',
                 description:`<@${afkProfile.user}> AFK has been removed`,
                 color:'RANDOM',
                 thumbnail:{
                     url: image
                 }
     
     
             })
         })
         afkProfile.delete()
        }
       

       
       
   }

   if(message.mentions.members.first()){
       await message.mentions.members.forEach(async (member) => {
        
           let afkProfile = await afkschema.findOne({Guild:message.guild.id},{user:member.user.id});

        
           if(afkProfile) 
           {
            const reason = afkProfile.reason
            const timestamp = afkProfile.date
            const timeAgo = moment(timestamp).fromNow();

           message.delete()
           await client.embed(message, {
                title:`AFK System`,
                color:'RANDOM',
                description: `${member.user.username} is currently afk \n(${timeAgo})\nReason: ${reason}`,
                footer: {
                    text: `${message.author.username}`,
                    iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
                }
             })
            
        }   
        })
       }


   

    const settings = await guildSchema.findOne(
        {
            guildID: message.guild.id,
        },
        (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const newGuild = new guildSchema({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.prefix,
                });

                newGuild
                    .save()
                    .then((result) => console.log(result))
                    .catch((err) => console.error(err));

                return message.channel
                    .send(
                        "This server was not in our database! We have now added and you should be able to use bot commands."
                    )
                    .then((m) => m.delete({ timeout: 10000 }));
            }
        }
    );

    const prefix = settings.prefix;

    if (!message.content.startsWith(prefix)) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    var getDirectories = function (src, callback) {
        glob(src + '/**/*', callback);
    };
    getDirectories('./commands', async function (err, res) {
    if (err) {
        console.log(err);
    } else {
        var commandFiles = [];
        commandFiles = res.filter((v, i) => v.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(file);
            client.commands.set(command.name, command);
        }
        if (!client.commands.has(command)) {
            return;
        }
        try {
            client.commands.get(command).execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply("Issue loading command");
        }

        if (command) {
            const blacklisted = await blacklistserver.findOne({Server: message.guild.id})

            if(blacklisted) return message.channel.send("Cannot use commands as owner has blacklisted this server")
            const channel = client.channels.cache.get("800421170301501470");

            channel.send(
                `**${message.author.tag}** has used ${command} command in **${message.guild.name}**`
            );
        }
    }
    });

});



client.on("guildMemberAdd", async (member) => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if (!data) return;
        const user = member.user;
        const image = await new canvas.Welcome()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setMemberCount(member.guild.memberCount)
            .setGuildName(member.guild.name)
            .setAvatar(user.displayAvatarURL({format: 'png'}))
            .setColor("border", "#08D9FB")
            .setColor("username-box", "#2063E9")
            .setColor("discriminator-box", "#2063E9")
            .setColor("message-box", "#2063E9")
            .setColor("title", "#2063E9")
            .setColor("avatar", "#2063E9")
            .setBackground(background)
            .toAttachment();
 
    const attachment = new Discord.MessageAttachment(await image.toBuffer(), "goodbye-image.png");
    const channel = member.guild.channels.cache.get(data.Channel); 
 
    channel.send(attachment);

    });

    const data = await muteschema.findOne({Guild:member.guild.id});
    if(!data) return 
    const user = data.Users.findIndex((prop) => prop === member.id)
    if(user == -1 ) return;
    const role = member.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === "muted"
    )
    member.roles.add(role.id)



    autoroleschema.findOne({Guild:member.guild.id}, async(err, data)=>{
        if(!data) return;

        const role = member.guild.roles.cache.get(data.Role);

        member.roles.add(role);

    })

    antiraid.findOne({Guild:member.guild.id}, async(err,data)=>{
        const kickReason = 'Anti-raidmode activated';
		if (!data) return;
		if (data) {
            try {
                member.send(
                    new Discord.MessageEmbed()
                        .setTitle(`Server Under Lockdown`)
                        .setDescription(
                            `You have been kicked from **${
                                member.guild.name
                            }** with reason: **${kickReason}**`
                        )
                        .setColor('RED')
                );
            } catch(e){
                throw e
            }
			member.kick(kickReason);
		}
    })


    altschema.findOne({Guild:member.guild.id}, async(err,data)=>{
        if(!data) return;

        const days = data.Days;
        const option = data.Option

        const channel = member.guild.channels.cache.get(data.Channel); 



        const timeSpan = ms(`${days} days`)

        const createdAt = new Date(member.user.createdAt).getTime()
        const difference = Date.now() - createdAt;

        if(difference < timeSpan){
            member.send('Alt Account Detected')

            if(option.toLowerCase() == 'kick'){

                const id = member.id;
                await member.kick();

                channel.send(
                    new Discord.MessageEmbed()
                     .setTitle('Alt Account Detected(Kick Option)')
                     .setDescription(`Member ${id}, Kicked due to detection of alt account - Account Age: ${createdAt}`)
                     .setColor("RANDOM")
                     .setTimestamp()
                )

            }
            else if(option.toLowerCase() == 'ban'){
                const id = member.id;
                member.ban()

                channel.send(
                    new Discord.MessageEmbed()
                     .setTitle('Alt Account Detected(Ban Option)')
                     .setDescription(`Member ${id}, Ban due to detection of alt account - Account Age: ${createdAt}`)
                     .setColor("RANDOM")
                     .setTimestamp()
                )
            }
            else{
                channel.send(
                    new Discord.MessageEmbed()
                     .setTitle('Alt Account Detected(Warning)')
                     .setDescription(`:warning: Alt Account has been detected - Account Age: ${createdAt}`)
                     .setColor("RANDOM")
                     .setTimestamp()
                )

            }

            
        }





    






    })

  
});

client.on("messageDelete", async (message) => {
    let snipes = client.snipes.get(message.channel.id) || []
    if(snipes.length > 5) snipes = snipes.slice(0,4)
    snipes.unshift({
        msg: message,
        author:message.author,
        image: message.attachments.first()?.proxyURL || null,
        time: Date.now()
    })

    client.snipes.set(message.channel.id, snipes)


    await ghostpingschema.findOne({Guild:message.guild.id}, async(err,data) =>{
        if(!data) return

        if(!message.mentions.members.first()) return;

        console.log("Mentioned")

        if(Pings.has(`pinged:${message.mentions.members.first().id}`)){

            const embed = new Discord.MessageEmbed()
                .setTitle('Ghost Ping Detected')
                .addField('Author', message.author.username, false)
                .addField('Content', message.content, true)
                .setColor('RANDOM')
                .setFooter(message.author.username,`${message.author.displayAvatarURL({dynamic: true})}`)
                .setTimestamp()

            message.channel.send(embed)
            
        }
    })
  

});

client.on("guildCreate", async(guild) => {

    let 

    
})


const voiceCollection = new Discord.Collection();

client.on("voiceStateUpdate", async (oldState, newState) => {
    const user = await client.users.fetch(newState.id);
    const member = newState.guild.member(user);
    await voiceSchema.findOne({ Guild: oldState.guild.id }, async (e, data) => {
        if(data == null) return;
        if (!oldState.channel && newState.channel.id === data.Channel) {
            const channel = await newState.guild.channels.create(user.tag, {
                type: "voice",
                parent: newState.channel.parent,
            });
            member.voice.setChannel(channel);
            voiceCollection.set(user.id, channel.id);
        } else if (!newState.channel) {
            if (oldState.channelID === voiceCollection.get(newState.id)) {
                return oldState.channel.delete();
            }
        }
    });
});

client.on("messageReactionAdd", async (reaction, user) => {
    const handleStarboard = async () => {
        starboardSchema.findOne({ Guild: reaction.message.guild.id }, async (err, data) => {
            if(data == null) return;
            const starboardchannel = data.Channel;
            const starboard = client.channels.cache.get(starboardchannel);
            const msgs = await starboard.messages.fetch({ limit: 100 });
            const existingMsg = msgs.find((msg) =>
                msg.embeds.length === 1
                    ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
                        ? true
                        : false
                    : false
            );
            if (existingMsg)
                existingMsg.edit(`${reaction.count} - ⭐ | ${reaction.message.channel}`);
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
                        reaction.message.id + " - " + new Date(reaction.message.createdTimestamp)
                    );

                if (reaction.message.attachments.array().length > 0) {
                    embed.setImage(reaction.message.attachments.first().url);
                }

                if (starboard) starboard.send(`1 - ⭐ | ${reaction.message.channel}`, embed);
            }
        });
    };
    if (reaction.emoji.name === "⭐") {
        starboardSchema.findOne({ Guild: reaction.message.guild.id }, async (err, data) => {
           if(data == null) return;
            const starboardchannel = data.Channel;
            const starboard = client.channels.cache.get(starboardchannel);

            if (reaction.message.channel.id == starboard.id) return;
            if (reaction.message.partial) {
                await reaction.fetch();
                await reaction.message.fetch();
                handleStarboard();
            } else handleStarboard();
        });
    }

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    reactionSchema.findOne({ Message: reaction.message.id }, async (err, data) => {
        if (!data) return;
        if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [roleid] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
        user.send("You have acquired this role");
    });
});

client.on("messageReactionRemove", async (reaction, user) => {
    const handleStarboard = async () => {
        starboardSchema.findOne({ Guild: reaction.message.guild.id }, async (err, data) => {
          if(data == null) return;
            const starboardchannel = data.Channel;
            const starboard = client.channels.cache.get(starboardchannel);
            const msgs = await starboard.messages.fetch({ limit: 100 });
            const existingMsg = msgs.find((msg) =>
                msg.embeds.length === 1
                    ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
                        ? true
                        : false
                    : false
            );
            if (existingMsg) {
                if (reaction.count === 0) existingMsg.delete({ timeout: 2500 });
                else existingMsg.edit(`${reaction.count} - | ${reaction.message.channel}`);
            }
        });
    };

    if (reaction.emoji.name === "⭐") {
        starboardSchema.findOne({ Guild: reaction.message.guild.id }, async (err, data) => {
          if(data == null) return;
            const starboardchannel = data.Channel;
            const starboard = client.channels.cache.get(starboardchannel);

            if (reaction.message.channel.id == starboard.id) return;
            if (reaction.message.partial) {
                await reaction.fetch();
                await reaction.message.fetch();
                handleStarboard();
            } else handleStarboard();
        });
    }

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    reactionSchema.findOne({ Message: reaction.message.id }, async (err, data) => {
        if (!data) return;
        if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [roleid] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
        user.send("Role has been removed");
    });
});

logger(client);
client.login(token);
