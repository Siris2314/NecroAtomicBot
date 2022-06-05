const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const  solenolyrics = require('solenolyrics');
const reactionMenu = require("discordv13-pagination")


module.exports =  {
    name:'lyrics',
    description:'Finds Lyrics For Currently Playing Song',
    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})

        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})
        
        const song = queue.songs[0]

        let songname = ''

        if(song.name.includes("(Official Video)") || song.name.includes("(Official Music Video)") || song.name.includes("(Official Audio)")){
          songname =  song.name.replace("(Official Video)", "") || song.name.replace("(Official Music Video)", "") || song.name.replace("(Official Audio)", "")
          console.log(songname)
        }


      try{
        lyrics = await solenolyrics.requestLyricsFor(songname)
        console.log(lyrics)
        if(!lyrics) return interaction.followUp({content: `Could not find lyrics for ${songname} `})
      } catch(err) {
          return interaction.followUp({content:`Could not find lyrics for ${songname}`})
      }

      const embed = new MessageEmbed()
        .setTitle(`Lyrics for ${song.name}`)
        .setDescription(lyrics)
        .setTimestamp()
        .setColor("#F0EAD6")


    if (embed.description.length >= 2048){
        const newdescription = `${embed.description.substring(0, 2045)}...`;

        const nextpage = new MessageEmbed()
          .setTitle(`Lyrics for ${song.name} page 2`)
          .setDescription(newdescription)
          .setTimestamp()
          .setColor("#F0EAD6")


        if(nextpage.description.length >= 2048){
          const newdescription2 = `${nextpage.description.substring(0, 2045)}...`;

          const nextpage2 = new MessageEmbed()
            .setTitle(`Lyrics for ${song.name} page 3`)
            .setDescription(newdescription2)
            .setTimestamp()
            .setColor("#F0EAD6")
          reactionMenu(interaction, [embed, nextpage, nextpage2]);
        }
        else{
          reactionMenu(interaction, [embed, nextpage]);
        }
          
       
          
    }
  } 
    
  }
