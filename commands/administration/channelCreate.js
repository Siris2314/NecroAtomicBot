const {Client, Message} = require('discord.js')

module.exports = {

  name:"channelcreate",
  description: 'creates a new channel',


  async execute(message, args,client){

    if(!message.member.hasPermission('MANAGE_CHANNELS')){
      return message.channel.send('Perms Denied')
    }

    const channelNameQuery = args.join(" ");

    if(!channelNameQuery){
      return message.channel.send('Please specify a channel name')
    }

  message.guild.channels.create(channelNameQuery).then((ch) => {
        message.channel.send(`Click ${ch} to access the newly created channel`)
    });
  },


};
