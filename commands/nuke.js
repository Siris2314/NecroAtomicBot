const {Message} = require('discord.js')

module.exports = {

  name: 'nuke',
  description: 'nukes channels',

  async execute(message, args, client) {

    if(!message.member.hasPermission('MANAGE_CHANNELS')){
      return message.channel.send('Cannot use this command')
    }

    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')){
      return message.channel.send('I need manage channels perm')
    }

    message.channel.clone().then((ch) => {
      ch.setParent(message.channel.parent.id)
      ch.setPosition(message.channel.position)
      message.channel.delete();

      ch.send('This channel has been nuked')
    })
  }
}
