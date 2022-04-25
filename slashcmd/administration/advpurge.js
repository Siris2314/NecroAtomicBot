const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "advpurge",
  description: "Advance Purge With User Number Deleted Messages",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "messages",
      description: "Enter a number of messages to clear(up to 300 messages)",
      type: "NUMBER",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let messages = interaction.options.getNumber("messages");

    if (messages > 100) {
      messages = messages - 100;
    }

    const fetch = await interaction.channel.messages.fetch({ limit: messages });
    const deletedMessages = await interaction.channel.bulkDelete(fetch, true);

    const results = {};
    for (const [, deleted] of deletedMessages) {
      const user = `${deleted.author.username}#${deleted.author.discriminator}`;
      if (!results[user]) results[user] = 0;
      if (deleted.author.bot) results[user] = 0;
      results[user]++;
    }

    const userMessageMap = Object.entries(results);

    const finalResult = `${deletedMessages.size} message${
      deletedMessages.size > 1 ? "s" : ""
    } were removed!\n\n${userMessageMap
      .map(([user, messages]) => `**${user}** : ${messages}`)
      .join("\n")}`;
    await interaction.channel.send({ content: finalResult });
  },
};
