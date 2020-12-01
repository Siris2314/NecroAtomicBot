const {prefix, token, bot_info} = require('../botconfig.json');

module.exports = {

  name:'help',
  description: 'Shows a list of commands and returns information about them',

  async execute(message, args, client){

    const data = [];
    const {commands} = message.client;

    if(!args.length){
      data.push("List of Commands: x")
      data.push(`${prefix}` + commands.map(c => c.name).join(`\n${prefix}`))
      data.push(`\nYou can use ${prefix}help [command name] to return info about a specific command`)

    }

    const name = args[0]

    const cmd = commands.get(name)

    if(!cmd){
      message.reply(`${name} is not a valid command`)
    }else {

        data.push(`Name: ${cmd.name}`)

    }



    if(cmd.description){

      data.push(`Description: ${cmd.description}`)

    }
    else{
      data.push(`Command has no description`)
    }
    message.channel.send(data)
  }
}
