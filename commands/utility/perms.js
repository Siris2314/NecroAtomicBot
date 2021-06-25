const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "perms",
  description: "View your server and channel perms!",
  async execute(message,args ,client){

    const mem = message.mentions.members.first() || message.author
    member = await message.guild.members
        .fetch(mem.id)
        .catch(err => console.log(err));
      if (!member) {
        return message.channel.send(`\\❌ User not found.`);
      }
      const sp = member.permissions.serialize();
      const channelperm = message.channel.permissionsFor(member).serialize();
      return message.channel.send(
        new MessageEmbed()
          .setColor(member.displayColor || "GREY")
          .setTitle(`${member.displayName}'s Permissions`)
          .setDescription(
            [
              "\\♨️ - This Server",
              "\\#️⃣ - The Current Channel",
              "```properties",
              " ♨️ |  #️⃣ |  Permission",
              "========================================",
              `${Object.keys(sp)
                .map((perm) =>
                  [
                    sp[perm] ? " ✅ |" : " ❌ |",
                    channelperm[perm] ? " ✅ |" : " ❌|",
                    perm
                      .split("_")
                      .map((x) => x[0] + x.slice(1).toLowerCase())
                      .join(" "),
                  ].join(" ")
                )
                .join("\n")}`,
              "```",
            ].join("\n")
          )
      );
  },
};
