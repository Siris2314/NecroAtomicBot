const winston = require("winston");

require('dotenv').config();

const prefix = process.env.prefix;

module.exports = {
	/**
   * Checks that a message is in the valid format for
   * @param {*} message Discord.js message
   */
	isValidMessage(message) {
		// If message is by a bot, it's not valid
		if (message.author.bot) {
			return false;
		}

		// If the message is a dm, it's valid
		if (message.channel.type === "dm") {
			return true;
		}

		// If the message starts with the prefix, it's valid
		if (message.content.startsWith(prefix)) {
			return true;
		}

		// If the message contains text wrapped in curly braces, it's valid
		if (message.content.match(this.animeRegex)) {
			return true;
		}

		// If the message contains text wrapped in curly braces, it's valid
		if (message.content.match(this.animeExtendedRegex)) {
			return true;
		}

		// If the message contains text wrapped in curly braces, it's valid
		if (message.content.match(this.mangaRegex)) {
			return true;
		}

		// If the message contains text wrapped in curly braces, it's valid
		if (message.content.match(this.mangaExtendedRegex)) {
			return true;
		}

		return false;
	},
	/**
   * Extract arguments from a message by splitting at spaces
   * @param {*} message Discord.js message
   */
	extractArgs(message) {
		// DMs don't need a prefix
		if (!message.content.startsWith(prefix) && message.channel.type === "dm") {
			return message.content.split(/ +/);
		}
		else {
			return message.content
				.slice(prefix.length) // Remove the prefix, then split at spaces.
				.trim()
				.split(/ +/);
		}
	},
	/**
   * Check that a command is valid by checking that it exists and it has arguments, if they
   * are required.
   * @param {String[]} args List of arguments. Obtained from Utils.discord.extractArgs
   * @param {*} client Discord.js client
   * @param {*} message Discord.js message
   */
	validateCommand(args, client, message) {
		// Use the first arg command name
		const commandName = args.shift().toLowerCase();

		// Find command for the name
		const command =
      client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		// Check if command exists
		if (!command) {
			winston.warn(`Unable to find command for '${commandName}'`);
			const data = [];
			data.push(`${message.author} I could not find any command like '${commandName}'`);
			data.push(`Try \`${prefix} help\``);
			message.channel.send(data);
			return;
		}

		// Check if the command requires args
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix} ${command.name} ${command.usage}\``;
			}

			message.channel.send(reply);
			return;
		}

		return command;
	},
	/**
   * :{anime title}:
   */
	animeExtendedRegex: /:\{[^{](.*?)[^}]\}:/g,
	/**
   * :{{anime title}}:
   */
	animeRegex: /:\{\{(.*?)\}\}:/g,
	/**
   * :{{manga title}}:
   */
	mangaExtendedRegex: /:<[^<](.*?)[^>]>:/g,
	/**
   * :{manga title}:
   */
	mangaRegex: /:<<(.*?)>>:/g,
};
