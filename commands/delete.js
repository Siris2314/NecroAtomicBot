const schema = require('../schemas/custom-commands');

module.exports = {
    name: 'delete',
    description:'deletes commands',
    async execute(message, args, client) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command');

        const name = args[0];

        if(!name) return message.channel.send('Please specify a command name');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('That custom command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Removed **${name}** from custom commands!`);
    }
}
