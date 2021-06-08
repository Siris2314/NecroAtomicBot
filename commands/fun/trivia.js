const request = require("node-superfetch");
const { createCanvas, registerFont } = require("canvas");
const path = require("path");
registerFont(path.join("./Korrina.otf"), { family: "Korinna" });

module.exports = {
  name: "trivia",
  description:
    "Answer A Trivia Question, Join VC While Playing For More Fun (optional)\n Inspired By The Show Jeopardy",
  async execute(message, args, client,ops) {
    const current = ops.games.get(message.channel.id);
    if (current)
      return message.channel.send(
        `**Please Wait Until The Current Game of \`${current.name}\` is Finished!**`
      );
    const { channel } = message.member.voice;
    try {
      ops.games.set(message.channel.id, { name: "trivia" });
      const question = await fetchQuestion();
      const clueCard = await generateClueCard(
        question.question.replace(/<\/?i>/gi, "")
      );
      let connection;
      try {
        if (channel) {
          connection = message.guild ? await channel.join() : null;
          if (connection) {
            connection.play(
              path.join(
                __dirname,
                "..",
                "..",
                "assets",
                "sounds",
                "jeopardy.mp3"
              )
            );
            if (message.channel.permissionsFor(client.user).has("ADD_REACTIONS")) {
              await message.react("🔉");
            } else {
              return message.channel.send(
                "**Missing Permissions - [ADD_REACTIONS]!**"
              );
            }
          }
        }
      } catch {
        return message.channel.send(
          "**Please Try Again - Connection Timed Out!**"
        );
      }
      await message.channel.send(
        `**The Category is - \`${question.category.title.toUpperCase()}\`! 30 Seconds To Answer!**`,
        {
          files: [{ attachment: clueCard, name: "clue-card.png" }],
        }
      );
      const messages = await message.channel.awaitMessages(
        (res) => res.author.id === message.author.id,
        {
          max: 1,
          time: 30000,
        }
      );
      if (connection) {
        connection.dispatcher.end();
        channel.leave();
      }
      const answer = question.answer.replace(/<\/?i>/gi, "*");
      ops.games.delete(message.channel.id);
      if (!messages.size)
        return message.channel.send(
          `**Time Up, The Answer Was \`${answer}\`!**`
        );
      const win =
        messages.first().content.toLowerCase() === answer.toLocaleLowerCase();
      if (!win) return message.channel.send(`**The Answer Was ${answer}!**`);
      return message.channel.send(`**Correct Answer!**`);
    } catch (err) {
      console.log(err);
      ops.games.delete(message.channel.id);
      return message.channel.send(
        `**Oh No, An Error Occurred, Try Again Later!**`
      );
    }
    async function fetchQuestion() {
      const { body } = await request
        .get("http://jservice.io/api/random")
        .query({ count: 1 });
      return body[0];
    }

    async function generateClueCard(question) {
      const canvas = createCanvas(1280, 720);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#030e78";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "white";
      ctx.font = "62px Korinna";
      const lines = await wrapText(ctx, question.toUpperCase(), 813);
      const topMost =
        canvas.height / 2 -
        ((52 * lines.length) / 2 + (20 * (lines.length - 1)) / 2);
      for (let i = 0; i < lines.length; i++) {
        const height = topMost + (52 + 20) * i;
        ctx.fillStyle = "black";
        ctx.fillText(lines[i], canvas.width / 2 + 6, height + 6);
        ctx.fillStyle = "white";
        ctx.fillText(lines[i], canvas.width / 2, height);
      }
      return canvas.toBuffer();
    }
  },
}
function wrapText(ctx, text, maxWidth) {
    return new Promise((resolve) => {
      if (ctx.measureText(text).width < maxWidth) return resolve([text]);
      if (ctx.measureText("W").width > maxWidth) return resolve(null);
      const words = text.split(" ");
      const lines = [];
      let line = "";
      while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
          const temp = words[0];
          words[0] = temp.slice(0, -1);
          if (split) {
            words[1] = `${temp.slice(-1)}${words[1]}`;
          } else {
            split = true;
            words.splice(1, 0, temp.slice(-1));
          }
        }
        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
          line += `${words.shift()} `;
        } else {
          lines.push(line.trim());
          line = "";
        }
        if (words.length === 0) lines.push(line.trim());
      }
      return resolve(lines);
    });
  }