const Discord = require('discord.js')

module.exports = {


  async execute(message, args,client){

    if(!message.member.permissons.has('MANAGE_CHANNELS')){
      return message.reply('Perms Denied')
    }

    const channelNameQuery = args.join(" ");

    if(!channelNameQuery){
      return message.reply('Please specify a channel name')
    }

    message.guilds.channels.create(channelNameQuery)
        .then(ch => {
          message.channel.send(`Click ${ch} to access the newly created channel`)
        });
  }


}
