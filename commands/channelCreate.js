const {Client, Message} = require('discord.js')

module.exports = {

  name:'channelCreate',
  description: 'creates a new channel',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */


  async execute(message, args,client){

    if(!message.member.permissons.has('MANAGE_CHANNELS')){
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
