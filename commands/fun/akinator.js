const { MessageEmbed } = require('discord.js');
const { Aki } = require('aki-api');
const { list, verify } = require('../../functions');
const regions = ['person', 'object', 'animal'];

module.exports = {

		name: 'akinator',
	
		description: 'Think About A Real or Fictional Character, I Will Try To Guess It',
	
	async execute(message,args,client){
		if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.channel.send('**Missing Permissions - [EMBED_LINKS]!**');
		if (!args[0]) return message.channel.send(`**What Category Do You Want To Use? Either \`${list(regions, 'or')}\`!**`);
		let stringAki = args[0].toLowerCase();
		let region;
		if (stringAki === 'person'.toLocaleLowerCase()) region = 'en';
		if (stringAki === 'object'.toLocaleLowerCase()) region = 'en_objects';
		if (stringAki === 'animal'.toLocaleLowerCase()) region = 'en_animals';
		if (!regions.includes(stringAki)) return message.channel.send(`**What Region Do You Want To Use? Either \`${list(regions, 'or')}\`!**`);
		try {
			const aki = new Aki({region});
			let ans = null;
			let win = false;
			let timesGuessed = 0;
			let guessResetNum = 0;
			let wentBack = false;
			let forceGuess = false;
			const guessBlacklist = [];
			while (timesGuessed < 3) {
				if (guessResetNum > 0) guessResetNum--;
				if (ans === null) {
					await aki.start();
				} else if (wentBack) {
					wentBack = false;
				} else {
					try {
						await aki.step(ans);
					} catch {
						await aki.step(ans);
					}
				}
				if (!aki.answers || aki.currentStep >= 79) forceGuess = true;
				const answers = aki.answers.map(answer => answer.toLowerCase());
				answers.push('end');
				if (aki.currentStep > 0) answers.push('back');
				const embed = new MessageEmbed()
					.setAuthor(message.author.username, message.author.displayAvatarURL())
					.setColor('GREEN')
					.setDescription(`**Q${aki.currentStep + 1} - ${aki.question}**\n${aki.answers.join(' | ')}${aki.currentStep > 0 ? ` | Back` : ''} | End`)
					.setFooter(`Yes/No To Confirm | Progress - ${Math.round(Number.parseInt(aki.progress, 10))}%`)
                await message.channel.send({embeds:[embed]});
				const filter = res => res.author.id === message.author.id && answers.includes(res.content.toLowerCase());
				const messages = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!messages.size) {
					await message.channel.send('**Time Up!**');
					win = 'time';
					break;
				}
				const choice = messages.first().content.toLowerCase();
				if (choice.toLowerCase() === 'end'.toLocaleLowerCase()) {
					forceGuess = true;
				} else if (choice.toLowerCase() === 'back'.toLocaleLowerCase()) {
					if (guessResetNum > 0) guessResetNum++;
					wentBack = true;
					await aki.back();
					continue;
				} else {
					ans = answers.indexOf(choice);
				}
				if ((aki.progress >= 90 && !guessResetNum) || forceGuess) {
					timesGuessed++;
					guessResetNum += 10;
					await aki.win();
					const guess = aki.answers.filter(g => !guessBlacklist.includes(g.id))[0];
					if (!guess) {
						await message.channel.send('**I Can\'t Think of Anyone!**');
						win = true;
						break;
					}
					guessBlacklist.push(guess.id);
					const embed = new MessageEmbed()
						.setAuthor(message.author.username, message.author.displayAvatarURL())
						.setColor('RED')
						.setTitle(`I'm ${Math.round(guess.proba * 100)}% Sure It's...`)
						.setDescription(`**${guess.name}${guess.description ? `\nProfession - ${guess.description}` : ''}\nRanking - ${guess.ranking}\nType Yes/No To Confirm!**`)
						.setImage(guess.absolute_picture_path || null)
						.setFooter(forceGuess ? 'Final Guess' : `Guesses - ${timesGuessed}`);
					await message.channel.send({embeds:[embed]});
					const verification = await verify(message.channel, message.author);
					if (verification === 0) {
						win = 'time';
						break;
					} else if (verification) {
						win = false;
						break;
					} else {
						const exmessage = timesGuessed >= 3 || forceGuess ? 'I Give Up!' : 'I Can Keep Going!';
						await message.channel.send(`**Hmm... Is That so? ${exmessage}**`);
						if (timesGuessed >= 3 || forceGuess) {
							win = true;
							break;
						}
					}
				}
			}
			if (win === 'time') return message.channel.send('**I Guess Your Silence Means I Have Won!**');
			if (win) return message.channel.send('**You Have Defeated Me This Time!**');
			return message.channel.send('**Guessed Right One More Time! I Love Playing With You!**');
		} catch (err) {
            console.log(err)
			return message.channel.send(`**Server Down, Try again later!**`);
		};
	}
};