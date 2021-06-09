const { MessageEmbed } = require("discord.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
  name: "rps",
  description:
    "Rock Paper Scissors Game. React to one of the emojis to play the game.",
  async execute(message, args,client){
    try {
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(
          message.member.displayName,
          message.author.displayAvatarURL()
        )
        .setFooter(message.guild.me.displayName, client.user.displayAvatarURL())
        .setDescription(
          "**Play A Game of RPS Against the bot!\nSelect Reactions To Play!**"
        )
        .setTimestamp();

      const m = await message.channel.send(embed);
      const reacted = await client.utils.promptMessage(
        m,
        message.author,
        30,
        chooseArr
      );

      const clientChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

      const result = await getResult(reacted, clientChoice);
      await m.reactions.removeAll();
      if (!reacted) {
        embed.setDescription(
          "I have won due to: **You have not reacted in time!**"
        );
        return m.edit(embed);
      }
      embed
        .setDescription("")
        .addField(`**${result}**`, `${reacted} vs ${clientChoice}`);

      m.edit(embed);
    } catch {
      return message.channel.send(
        "**Missing Permissions - [MANAGE_MESSAGES]!**"
      );
    }

    function getResult(me, clientChosen) {
      if (
        (me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")
      ) {
        return "You won!";
      } else if (me === clientChosen) {
        return "Its a tie!";
      } else {
        return "You lost!";
      }
    }
  },
};