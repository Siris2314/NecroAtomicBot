const winston = require("winston");
const { generateMessageEmbed } = require("../utils/anime");
const discordUtils = require("../utils/discord");
const Discord = require("discord.js");
const anilist = require("./anilist");
const Media = require("../../schemas/Media");

/**
 * Check if a message contains a bracket link and handle if it does.
 * @param {Discord.Message} message
 * @returns {boolean} True if the message has been handled
 */
async function checkAndHandleBracketsSearch(message) {
	// Handle :{{anime title}}:
	const animeExtendedFound = message.content.match(discordUtils.animeExtendedRegex);
	if (animeExtendedFound) {
		await handleSearch("ANIME", animeExtendedFound, message, true);
	}
	// Handle :{anime title}:
	const animeFound = message.content.match(discordUtils.animeRegex);
	if (animeFound) {
		await handleSearch("ANIME", animeFound, message, false);
	}
	// Handle :<<manga title>>:
	const mangaExtendedFound = message.content.match(discordUtils.mangaExtendedRegex);
	if (mangaExtendedFound) {
		await handleSearch("MANGA", mangaExtendedFound, message, true);
	}
	// Handle :<manga title>:
	const mangaFound = message.content.match(discordUtils.mangaRegex);
	if (mangaFound) {
		await handleSearch("MANGA", mangaFound, message, false);
	}

	if (animeExtendedFound || animeFound || mangaExtendedFound || mangaFound) {
		return true;
	}
	else {
		return false;
	}
}

/**
 *
 * @param query The user query
 * @returns {Promise<Media[]>}
 */
async function searchForTitle(query) {
	return (await anilist.searchAnime(query, 5)).map(a => new Media(
		a.title.romaji,
		a.coverImage.extraLarge,
		a.description,
		a.genres,
		a.meanScore,
		a.siteUrl,
		a.status,
		`${a.startDate.day}-${a.startDate.month}-${a.startDate.year}`,
		`${a.endDate.day}-${a.endDate.month}-${a.endDate.year}`,
		a.episodes,
		a.duration,
		a.isAdult,
		a.trailer ? a.trailer.id : null,
		a.trailer ? a.trailer.site : null,
	));
}

/**
 *
 * @param {string} type ANIME or MANGA
 * @param {RegExpMatchArray} found Matches in regex
 * @param {Discord.Message} message
 * @param {boolean} extended
 */
async function handleSearch(type, found, message, extended) {
	// Repeat for as many strings found
	for (let query of found) {
		// Remove anime extended brackets
		query = query.replace(":{{", "");
		query = query.replace("}}:", "");
		// Remove anime brackets
		query = query.replace(":{", "");
		query = query.replace("}:", "");
		// Remove manga extened
		query = query.replace(":<<", "");
		query = query.replace(">>:", "");
		// Remove manga brackets
		query = query.replace(":<", "");
		query = query.replace(">:", "");

		// Remove any extra space
		query = query.trim();

		if (query === "") {
			return;
		}

		try {
			const media = await searchAnilist(type, query);
			if (!media) {
				message.channel.send(`I was unable to find any ${type.toLowerCase()} called *${query}*`);
				return;
			}

			const embed = generateMessageEmbed(type, media, extended);

			message.channel.startTyping();
			const sentMessage = await message.channel.send(media.title, embed);
			if (media.trailerUrl) {
				await sentMessage.react("📹");
			}

			// Wait for 📹reaction to show trailer
			const filter = (reaction, user) => {
				return reaction.emoji.name === "📹" && !user.bot;
			};
			const collector = sentMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 });
			collector.on("collect", () => {
				if (media.trailerUrl) {
					message.channel.send(media.trailerUrl);
				}
			});

			await message.react("✅");
			await message.channel.stopTyping(true);
			winston.debug(`Sent reply for '${query}'`);
		}
		catch (e) {
			await message.react("❗");
			await message.channel.stopTyping(true);
			winston.error(e);
		}
	}
}

/**
 * @param {string} type ANIME or MANGA
 * @param {String} query Anime title
 */
async function searchAnilist(type, query) {
	winston.debug(`Searching for ${type} '${query}'`);

	let a;
	if (type == "ANIME") {
		a = (await anilist.searchAnime(query, 1))[0];
	}
	else if (type == "MANGA") {
		a = (await anilist.searchManga(query, 1))[0];
	}

	if (!a) {
		winston.debug(`Unable to find '${query}' on Anilist`);
		return null;
	}
	winston.debug(`Found '${query}' on Anilist`);

	const anime = new Media(
		a.title.romaji,
		a.coverImage.extraLarge,
		a.description,
		a.genres,
		a.meanScore,
		a.siteUrl,
		a.status,
		`${a.startDate.day}-${a.startDate.month}-${a.startDate.year}`,
		`${a.endDate.day}-${a.endDate.month}-${a.endDate.year}`,
		a.episodes,
		a.duration,
		a.isAdult,
		a.trailer ? a.trailer.id : null,
		a.trailer ? a.trailer.site : null,
	);

	return anime;
}

module.exports = {
	checkAndHandleBracketsSearch,
	searchForTitle,
};
