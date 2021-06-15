const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
require("dotenv").config();
const ownerid = process.env.ownerid;
module.exports = {
	name: 'eval',
	description: 'Lol hi if your"r seeing this have a good day!',
	async execute(message, args,client){
		if(!message.author.id == ownerid) (`U thought u can use the eval command :joy:`)

		let code = args.join(" ");
        if (!code)
            return message.channel.send(
                "provide code dumb"
            );
        function CheckFilter(object) {
            if (typeof object === "string") {
                object = object.replace(
                    new RegExp(process.env.token, "gi"),
                    "Check Console"
                );
            } else if (typeof object === "object") {
                if (Array.isArray(object)) {
                    for (let i = 0; i < object.length; i++) {
                        object[i] = CheckFilter(object[i]);
                    }
                } else {
                    for (let key in object) {
                        object[key] = CheckFilter(object[key]);
                    }
                }
            }
            return object;
        }
        let oldSend = Discord.TextChannel.prototype.send;
        Discord.TextChannel.prototype.send = async function send(content, options) {
            return oldSend.bind(this)(CheckFilter(content), CheckFilter(options));
        };
        let evaled;
        try {
            evaled = eval(code);
            if (evaled instanceof Promise) evaled = await evaled;
        } catch (err) {
            evaled = err;
        }
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        evaled = new (require("string-toolkit"))().toChunks(evaled, 750);
        let reactions = ["❌", "⏪", "◀️", "⏹️", "▶️", "⏩"],
            page = 0,
            evaledEmbed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(`\`\`\`js\n${evaled[0]}\n\`\`\``)
                .addField(`Type of`, `\`\`\`js\n${typeof (evaled[0])}\n\`\`\``)
        let mainMessage = await message.channel.send(evaledEmbed);
        Discord.TextChannel.prototype.send = oldSend;
        await Promise.all(
            (evaled.length === 1 ? ["❌", "⏹️"] : reactions).map(r =>
                mainMessage.react(r)
            )
        );
        let filter = (reaction, user) =>
            (evaled.length === 1 ? ["❌", "⏹️"] : reactions).some(
                e => e === reaction.emoji.name
            ) && user.id === message.author.id;
        let collector = mainMessage.createReactionCollector(filter, {
            time: 300000
        });
        collector.on("collect", async (reaction, user) => {
            switch (reaction.emoji.name) {
                case "❌":
                    await collector.stop();
                    return mainMessage.delete();
                    break;
                case "⏪":
                    if (evaled.length === 1 || page === 0) return;
                    page = 0;
                    break;
                case "◀️":
                    if (evaled.length === 1) return;
                    if (page === 0) {
                        page = evaled.length - 1;
                    } else {
                        page -= 1;
                    }
                    break;
                case "⏹️":
                    await collector.stop();
                    for (let reaction of mainMessage.reactions.cache.array()) {
                        await reaction.users.remove(client.user.id);
                    }
                    return;
                    break;
                case "▶️":
                    if (evaled.length === 1) return;
                    if (page === evaled.length - 1) {
                        page = 0;
                    } else {
                        page += 1;
                    }
                    break;
                case "⏩":
                    if (evaled.length === 1 || page === evaled.length - 1) return;
                    page = evaled.length - 1;
                    break;
            }
            evaledEmbed = new Discord.MessageEmbed()
                .setColor(message.guild.me.displayColor)
                .setDescription(`\`\`\`js\n${evaled[page]}\n\`\`\``)
                .addField(`Type of`, `\`\`\`js\n${typeof (evaled[page])}\n\`\`\``)

            await mainMessage.edit({
                embed: evaledEmbed
            });
        });
	}
}