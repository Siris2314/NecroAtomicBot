module.exports = {
  name:'nuke',
  description:'nukes a channel',
  async execute(message, args,client) {
      if(!message.member.hasPermission('MANAGE_CHANNELS') || !message.member.hasPermission('ADMINISTRATOR')) {
          message.reply(`You can\'t use this command you need \`MANAGE_CHANNELS\` permission.`)
          return;
      }
      
      if(!message.guild.me.hasPermission('MANAGE_CHANNELS') || !message.guild.me.hasPermission('ADMINISTRATOR')) {
          message.reply('I need \`MANAGE_CHANNELS\` permission to run this command.')
          return
      }


      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
  
      let position = channel.position
      try {
      
          await channel.clone().then((ch) => {
             
              ch.setPosition(position)
             
              channel.delete().catch(err => {

                  ch.delete()
                 
                  message.channel.send(`I can't nuke the channel due error: \`Undefined\``)
                  return
              })

          
  
              ch.send("https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif")
              })

      } catch(err) {
          message.channel.send(`I can't nuke the channel due error: \`Undefined\``)
      }
  }
}