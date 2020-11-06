const Discord = require('discord.js')
const thanksSchema = ('@schemas/thanks-schemas')

module.exports = {


     name: "thanks",
     description:"User Thanking System",





  async execute(message,args){

    const target = message.mentions.users.first()

    if(!target){
      message.channel.send('Please Tell Me Who to Thank')
      return
    }

    const {guild} = message
    const guildId = guild.id
    const targetId = target.id
    const authorId = message.author.id
    const now = new Date()

    if(targetId === authorId){
      message.channel.send("Cannot thank yourself")
      return
    }

    const authorData = await thanksSchema.findOne({

      userId: authorId,
      guildId
    })
    if(authorData && authorData.lastGave){
      const then = new Date(authorData.lastGave)

      const diff = now.getTime() - then.getTime()
      const diffHour = Math.round(diff/ (1000 *60 *60))
      const hours = 24
      if(diffHour <= hours){
        message.channel.send("Already thanked someone in 24 hours")
        return
      }

    }

    await thanksSchema.findOneAndUpdate({
      userId :authorId,
      guildId
    }, {
      userId :authorId,
      guildId,
      lastGave: now
    }, {
      upsert: true

    })
    await thanksSchema.findOneAndUpdate({
      userId: targetId,
      guildId
    }, {
      userId: targetId,
      guildId,
      $inc: {
        received :1
      }
    }, {
      upsert: true,
      new: true
    })
    const amount = result.received
    message.channel.send(`You have thanked <@${targetId}>!, They now have ${amount}`)
  }
}
