const {
    Client,
    Message,
    MessageEmbed
  } = require('discord.js');
  
  module.exports = {
    name: 'purge-not',
    description: 'Deletes any messages that is not the text provided in the current channel',
    usage: '<prefix> <text> <amount> [limit: 100]',

  
    async execute(message, args,client){
      if (!message.member.hasPermission("ADMINISTRATOR" || "MANAGE_CHANNELS")) return message.reply("You do not have perms to use this command!")
  
      const {
        channel
      } = message;
  
  
      if (!channel.permissionsFor(message.guild.me).has(['MANAGE_MESSAGES']))
        return message.channel.send('I do not have permission to manage messages in the provided channel');
  
  
      const amount = parseInt(args[0]);
      if (isNaN(amount) === true || !amount || amount < 0 || amount > 100)
        return message.channel.send('Please provide a message count between 1 and 100');
  
      const text = args.slice(1).join(" ");
      if (!text.length > 20) return message.channel.send('The matching text must be lesser than 20 characters!!')
  
  
      await message.delete(); 
      
      
      let messages = (await channel.messages.fetch({
        limit: amount
      })).filter(m => m.content !== text)
  
      if (messages.size === 0) {
  
        message.channel.send(
          new MessageEmbed()
          .setTitle('Purge')
          .setDescription(`
                  Unable to find any messages without the text **${text}**. 
                  This message will be deleted after \`10 seconds\`.
                `)
          .addField('Channel', channel, true)
          .addField('Found Messages', `\`${messages.size}\``, true)
          .setFooter(message.member.displayName, message.author.displayAvatarURL({
            dynamic: true
          }))
          .setTimestamp()
          .setColor("RANDOM")
        ).then(msg => msg.delete({
          timeout: 10000
        })).catch(err => console.log(err));
  
      } else {
  
        channel.bulkDelete(messages, true).then(messages => {
          const embed = new MessageEmbed()
            .setTitle('Purge')
            .setDescription(`
                  Successfully deleted **${messages.size}** non-matching message(s). 
                  This message will be deleted after \`10 seconds\`.
                `)
            .addField('Channel', channel, true)
            .addField('Message Count', `\`${messages.size}\``, true)
            .addField('Content to not include:', `\`${text}\``, true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
              dynamic: true
            }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
  
          message.channel.send(embed).then(msg => msg.delete({
              timeout: 10000
            }))
            .catch(err => console.log(err));
        });
      }
  
    }
  }