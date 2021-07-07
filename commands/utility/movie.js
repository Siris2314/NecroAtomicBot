const Discord = require("discord.js");
const imdb = require("imdb-api");
require("dotenv").config();
const token = process.env.imdb


module.exports = {
    name:'movie',
    description:'Returns IMBD Data on a Movie',

    async execute(message,args,client){


    try{

        const imclient = new imdb.Client({apiKey: token})

        

        if(!args.join(" ")){
            client.embed(message, {
                title:'Movie Not Provided',
                description:`${message.author.username} did not provide a movie to search. For example try **<prefix> movie John Wick** to find details on the first John Wick movie `,
                timestamp: Date.now(),
                thumbnail: {
                    url: message.author.displayAvatarURL({dynamic:true})
                },
                color:'RANDOM'

            })
        }

        const movie = await imclient.get({'name': args.join(" ")})


        const embed = new Discord.MessageEmbed()
          .setTitle(`${movie.title}`)
          .addField('**Year:**',`\`${movie.year}\``, true)
          .addField('**Parental Rating:**',`\`${movie.rated}\``, true)
          .addField('**Release Date:**',`\`${movie.released}\``, true)
          .addField('**Runtime:**',`\`${movie.runtime}\``, true)
          .addField('**Rating(Rotten Tomatoes):**',`\`${movie.ratings[1].value}\``, true)
          .addField('**Genre:**',`\`${movie.genre}\``, true)
          .addField('**Director:**',`\`${movie.director}\``, true)
          .addField('**Writers:**',`\`${movie.writer}\``, true)
          .addField('**Summary:**',`\`${movie.plot}\``, true)
          .addField('**Actors:**',`\`${movie.actors}\``, true)
          .addField('**Language:**',`\`${movie.language}\``, true)
          .addField('**Country of Origin:**',`\`${movie.country}\``, true)
          .setImage(movie.poster)

        message.channel.send(embed)



        
    } catch(err){
        console.log(err)
    }
}




}