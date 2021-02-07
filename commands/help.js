const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
require('dotenv').config();
const token = process.env.token;
const prefix = process.env.prefix;

module.exports = {
  name: "help",
  description: "Shows all available bot commands.",
   async execute (message, args, client) {

     const data = [];
     const {commands} = message.client;

     if(!args.length){
       data.push("Here is the list of commands");
       data.push(`${prefix}` + commands.map(c=>c.name).join(`\n${prefix}`))
       data.push(`\nYou can use ${prefix}help [command name to get specific info about a command]`)
       message.channel.send(data);

       return;
     }

     const name = args[0]
     const cmd = commands.get(name) || commands.find(c=>c.aliases && c.aliases.includes(name))


     if(!cmd){
       message.channel.send(`${cmd} is not a valid command`)
       return;
     }


     data.push(`Name: ${cmd.name}`);
     if(cmd.description){
       data.push(`Description: ${cmd.description}`)
     }

     message.channel.send(data);



    }

};
