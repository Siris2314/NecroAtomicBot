const {Client, Message, MessageEmbed} = require('discord.js');
const { getTracks, getPreview } = require("spotify-url-info")

module.exports = {
    name: 'play',
    description: 'Plays music in a voice channel',

    async execute(message,args,client){

        if(!message.member.voice.channel) return message.channel.send('Cannot use command when not in VC')

        if(!args.join(" ")) return message.channel.send('Please enter a song name')
        
        if(args.join(" ").toLowerCase().includes("spotify") && (args.join(" ").toLowerCase().includes("track"))){
            getPreview(args.join(" ")).then(result => {
              client.music.play(message, result.track);
            })
          }
          else if(args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("playlist")){
            getTracks(args.join(" ")).then(result => {
              for(const song of result){
               client.music.play(message, song.name);
              }
            })
          }
          else{
            client.music.play(message,args.join(" "));
          }

        

       
    }
}