const {Client, Message} = require('discord.js')

module.exports = {

  name:'channelDelete',
  description: 'Deletes a new channel',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(message, args,client){

    if(!message.member.permissons.has('MANAGE_CHANNELS')){
      return message.reply('Perms Denied')
    }

    const channelTarget = message.mentions.channels.first()

    if(!channelTarget){
      return message.reply('Please specify a channel name')
    }

    channelTarget.delete().then((ch) => {
        message.author.send(`Channel has been deleted`)
    });



  }


}
