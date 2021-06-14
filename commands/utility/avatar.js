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
      message.member;
    const pngFormat = user.user.displayAvatarURL({ format: "png" });
    const jpgFormat = user.user.displayAvatarURL({ format: "jpg" });
    const webpFormat = user.user.displayAvatarURL();
    const avatar = user.user.displayAvatarURL({ dynamic: true });
    message.channel.send(
      new MessageEmbed()
        .setTitle(`${user.user.username}'s avatar`)
        .setDescription(
          `[png](${pngFormat}) | [jpg](${jpgFormat}) | [webp](${webpFormat})`
        )
        .setImage(avatar)
    );
  },
};