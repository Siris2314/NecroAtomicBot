const {Client, Message, MessageEmbed} = require('discord.js')
const moment = require('moment')

module.exports = {

  name:"serverinfo",
  description: "returns info of server",

  async execute(message,args,client){
    const guild = message.guild;
    const embed = new MessageEmbed()
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL())
      .setColor('RANDOM')
      .addField('General Info', [
        `ID: ${guild.id}`,
        `Name: ${guild.name}`,
        `Owner: ${guild.owner}`
      ])
      .addField('Counts',[
        `Role: ${guild.roles.cache.size} roles`,
        `Channels: ${guild.channels.cache.size} total 
            (Text:${guild.channels.cache.filter(
              (ch)=>ch.type === "text").size
            }, Voice:${guild.channels.cache.filter(
              (ch)=>ch.type === "voice").size
            })`, 
        `Emojis: ${guild.emojis.cache.size} (Regular: ${guild.emojis.cache.filter((e) => !e.animated).size}, Animated: ${guild.emojis.cache.filter((e) => e.animated).size})`
      ])
      .addField("Miscellaneous Information", [
        `Created:${moment(guild.createdTimestamp).format('LT')}, ${moment(guild.createdTimestamp).format('LL')}, ${moment(guild.createdTimestamp).fromNow()}`, 
        `Region: ${guild.region}`, 
        `Boost Tier: ${guild.premiumTier ? `Tier ${guild.premiumTier}` : "None" }`, 
        `Boost Count: ${guild.premiumSubscriptionCount || "0"}`,
      ])

    message.channel.send(embed);
    
  }


  
}
