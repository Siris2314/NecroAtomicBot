const {MessageEmbed} = require("discord.js")
module.exports = {
  name: "avatar",
  description:'Returns Avatar of User With and Without Pinging',
  async execute(message, args,client){
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((u) =>
        u.user.username.toLowerCase().includes(
          args.join(" ") || u.user.tag.toLowerCase() === args.join(" ")
        )
      ) ||
      message.member ||  message.guild.members.cache.find((u) =>
      u.user.username.toUpperCase().includes(
        args.join(" ") || u.user.tag.toLowerCase() === args.join(" ")
      )
    )
    const pngFormat = user.user.displayAvatarURL({ format: "png" });
    const jpgFormat = user.user.displayAvatarURL({ format: "jpg" });
    const format1024 = user.user.displayAvatarURL({dynamic: true, size:1024});
    const format2048 = user.user.displayAvatarURL({dynamic: true, size:2048});
    const format4096 = user.user.displayAvatarURL({dynamic: true, size:4096});
    const webpFormat = user.user.displayAvatarURL();
    const avatar = user.user.displayAvatarURL({ dynamic: true, size:4096});
    message.channel.send({embeds:[
      new MessageEmbed()
        .setTitle(`${user.user.username}'s avatar`)
        .setDescription(
          `[png](${pngFormat}) | [jpg](${jpgFormat}) | [webp](${webpFormat}) | [1024](${format1024}) | [2048](${format2048}) | [4096](${format4096})`
        )
        .setImage(avatar)
    ]});
  },
};