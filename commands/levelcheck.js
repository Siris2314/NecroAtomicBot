const levels = require('../levels.js');

module.exports = {
  name: 'level',
  description: 'returns user level',

  async execute(message,args){
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

  
  }
}
