const { generateMessageEmbed } = require("../utils/anime");
const winston = require("winston");
const core = require("../core");

module.exports = {
	name: "animesr",
	description: 'search an anime!',
	/**
		 *
		 * @param {Client} client
		 * @param {Message} message
		 * @param {String[]} args
		 */
	async execute(message, args,client){
		const title = args.join(" ").replace(/"/gm, "");
		winston.debug(`Searching for '${title}'`);
		const results = await core.searchForTitle(title);
		const data = [];
		for (let i = 0; i < results.length; i++) {
			const media = results[i];
			data.push(`${i + 1} ${media.title}`);
		}
		winston.debug(`Found ${results.length} results`);

		const res = data.join("\n");
		const sentMessage = await message.channel.send({ content: `"${title}"\`\`\`${res}\`\`\`` });
		const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
		for (let i = 0; i < results.length; i++) {
			await sentMessage.react(emojis[i]);
		}


		const filter = (reaction, user) => {
			return emojis.includes(reaction.emoji.name) && !user.bot;
		};
		const collector = sentMessage.createReactionCollector(filter, { max: 5, time: 5 * 60 * 1000 });
		collector.on("collect", async (reaction) => {
			const index = emojis.indexOf(reaction.emoji.name);
			if (index === -1) return;

			const media = results[index];
			winston.debug(`User selected '${media.title}'`);

			const embed = generateMessageEmbed("ANIME", media, true);

			await message.channel.sendTyping();
			const sentMessage = await message.channel.send({ embeds: [embed], content: media.title });
			if (media.trailerUrl) {
				await sentMessage.react("📹");
			}


			const filter = (reaction, user) => {
				return reaction.emoji.name === "📹" && !user.bot;
			};
			const collector = sentMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 });
			collector.on("collect", () => {
				if (media.trailerUrl) {
					message.channel.send({ content: media.trailerUrl });
				}
			});

			await message.react("✅");
			
            
			winston.debug(`Sent reply for '${media.title}'`);
		});
	},
};
