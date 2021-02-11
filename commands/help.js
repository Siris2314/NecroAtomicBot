require('dotenv').config();

module.exports = {
    name: "help",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: ['halp', 'welp', 'cmds'],
    async execute(bot, msg, args) {
        const data = [];
        const { commands } = msg.client;

        if(!args.length) {
            data.push("Here is a list of my commands.");
            data.push(`${prefix} ` + commands.map(c => c.name).join(`\n${prefix} `));
            data.push(`\nYou can use ${prefix}help [command name] to get info about a specific command.`);
            msg.channel.send(data);

            return;
        }

        const name = args[0];
        const cmd = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!cmd){
            msg.reply(`${name} is not a valid command.`);

            return;
        }

        data.push(`Name: ${cmd.name}`);

        if(cmd.desc) data.push(`Description: ${cmd.desc}`);
        if(cmd.aliases) data.push(`Aliases: ${cmd.aliases.join(', ')}`);

        msg.channel.send(data);
    },
} // !help test
