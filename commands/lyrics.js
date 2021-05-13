
const Discord = require('discord.js')
const lyricsFinder = require('lyrics-finder');

module.exports = {
    name:'lyrics',
    description:'Shows lyrics of current song playing',

    async execute(message,args,client){
        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        let queue = client.music.getQueue(message);
        if(!queue){
            const embed = new Discord.MessageEmbed()
              .setTitle(`:x: **Queue Error**`)
              .setDescription('No Queue Currently Exists')
          return message.channel.send(embed)
        }

        let artist = queue.songs[0].uploader.name
        console.log(artist)
        let songName = queue.songs[0].name
        let pages = [];
        let currentPage = 0;

        const messageFilter = m => m.author.id === message.author.id;
        const reactionFilter = (reaction,user) => [':arrow_left:',':arrow_right:'].includes(reaction.emoji.name) && (message.author.id === user.id)

        await message.channel.awaitMessages(messageFilter, {max: 1, time:15000}).then(async collected => {
            await finder(artist, songName, message, pages)
        })
        
        const lyricEmbed = await message.channel.send(`Lyrics Pages: ${currentPage + 1}/${pages.length}`, pages[currentPage])
        await lyricEmbed.react('⬅️')
        await lyricEmbed.react('➡️')

        const collector = lyricEmbed.createReactionCollector(reactionFilter)

        collector.on('collect', (reaction,user) => {
            if(reaction.emoji.name === ':arrow_right:'){
                if(currentPage < pages.length-1){
                    currentPage+=1;
                    lyricsEmbed.edit(`Lyrics page: ${currentPage+1}/${pages.length}`,pages[currentPage])
                }
                else if(reaction.emoji.name === ':arrow_left:'){
                    if(currentPage !== 0){
                        currentPage -=1;
                    }
                    lyricsEmbed.edit(`Lyrics page: ${currentPage+1}/${pages.length}`,pages[currentPage])
                }
            }
        })






      

    }
}


async function finder(artist, songName, message, pages){
    let fullLyrics = await lyricsFinder(artist, songName);

    for(let i = 0; i<fullLyrics.length; i+=2048){
        const lyric = fullLyrics.substring(i, Math.min(fullLyrics.length, i + 2048))
        const msg = new Discord.MessageEmbed()
          .setDescription(lyric)
        pages.push(msg)
    }
}




