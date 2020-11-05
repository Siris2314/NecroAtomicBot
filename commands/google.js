const Discord = require('discord.js');
const request = require('node-superfetch');
const { google } = require('../botconfig.json');

module.exports = {

  name:"google",
  descriptions:"searches on google",

  async execute(message,args){

  let googleKey = google;
  let csx = "e07debb6d8725ce79";
  let query = args.join(" ");
  let result;

  if(!query){
    return message.channel.send("Please Enter a Query");

  }
  href = await search(query);

  if(!href){
    return message.channel.send("Cannot Find Query");
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(href.title)
    .setDescription(href.snippet)
    .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
    .setURL(href.link)
    .setFooter("Powered by Google")

  return message.channel.send(embed);

  async function search(query){
    const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
      key: googleKey, cx: csx, safe:"off", q:query
    });
    if(!body.items){
      return null
    }
    return body.items[0];
  }

}
}
