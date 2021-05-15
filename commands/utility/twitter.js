const Discord = require("discord.js")
const request = require('node-superfetch');
require('dotenv').config();
let bearer = process.env.twitter;
let {stripIndents} = require('common-tags');

module.exports = {
  name:'twitter',
  description:'returns twitter profile',

  async execute(message,args,client){
    let username = args[0]
    if(!username){
      return message.channel.send("Please provide a username")
    }
    try{
      const {body} = await request.get("https://api.twitter.com/1.1/users/show.json")
        .set({Authorization:`Bearer ${bearer}`}).query({screen_name: username})

      const embed = new Discord.MessageEmbed()
        .setAuthor(`@${body.screen_name.toLowerCase()}`, body.verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verified.png": null)
        .setDescription(body.description)
        .setFooter(`Twitter User ID: ${body.id}`, "https://abs.twimg.com/favicons/twitter.ico")
        .addField("Counts", stripIndents`
         -**Followers:** ${(body.followers_count).toLocaleString()}
         -**Following:**${(body.friends_count).toLocaleString()}
         -**Tweets**${(body.statuses_count).toLocaleString()}
         `, true)
         .addField("Created Since:", body.created_at, true)
         .setThumbnail(body.profile_image_url_https.replace('_normal', ''))
         .setImage(body.profile_banner_url)

         return message.channel.send(embed)

    } catch(error){
      if(error.status === 403) return message.channel.send("This user has either made their account private or closed it")
      else if(error.status == 404) return message.channel.send("This user does not exist")
      else return message.channel.send(`Unknown error: ${error.message}`)
    }
  }
}
