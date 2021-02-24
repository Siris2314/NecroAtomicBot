const util = require('minecraft-server-util')
const Discord = require('discord.js')

module.exports = {
  name:'mcserver',
  description:'get info from minecraft server',

  async execute(message, args, client){
    if(!args[0]) return message.channel.send('Please enter a minecraft server ip');
    if(!args[1]) return message.channel.send('Please enter a minecraft server port')

    util.status(args[0], {port: args[1]}).then((response) => {
      const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('MC Server Status')
        .addField(
          {name: 'Server IP',value: response.host},
          {name: 'Online Players', value: response.onlinePlayers},
          {name:'Max Players', value: response.maxPlayers},
          {name:'Version', value: response.version}


        )
        .setFooter('MC Server Util by NecroAtomicBot')

        message.channel.send(embed)

    })
    .catch((error) => {
      message.channel.send("Error finding server")
      throw error;
    })
  }
}
