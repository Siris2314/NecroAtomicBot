const profileSchema = require('../schemas/profile-schema')
module.exports = {
  name: 'level',
  description: 'returns user level',

  async execute(message,args){
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const result = await profileSchema.findOne({
      guildId,
      userId

    }).then(result => {
      console.log(result)
      message.reply(`Your current level is **${result}**`)
    })




  }
}
