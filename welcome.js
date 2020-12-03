const mongo = require('./mongo.js')
const welcomeSchema = require('./schemas/welcome-schema.js')

module.exports = {
  name: "set-welcome",
  description: "sets a welcome message",

  async execute(message,args,client){

    const {member, channel, content, guild} = message

    const cache = {};

    if(!member.hasPermissions('ADMINISTRATOR')){
      channel.send('Perms Denied')
    }


    let text = content

    const split = text.split(' ')

    if(split.length < 2){
      channel.send('Please provide a welcome message')
    }

    split.shift()
    text = split.join(' ')

    cache[guild.id] = [channel.id, text];


    await mongo().then(async (mongoose) => {

      try{
      await welcomeSchema.findOneAndUpdate({
        _id:guild.id
      }, {
        _id:guild.id,
        channelId: channel.id,
        text,
      }, {
        upsert: true
      })
      } finally {
        mongoose.connection.close()
      }
    })

    const onJoin = member => {

      const {guild} = member
      let data = cache[guild.id]

      if(!data){
        console.log('FETCHING FROM DB')
        await mongo().then(mongoose => {
          try{
            const result = await welcomeSchema.findOne({_id: guild.id})

            cache[guild.id] = data = [result.channelId, result.text]

          } finally {
            mongoose.connection.close()
          }
        })
      }

      const channelId = data[0]
      const text = data[1]

      const channel = guild.channels.cache.get(channelId)
      channel.send(text.replace(/<@>/g, `<@${member.id}>`))

    }

    client.on('guildMemberAdd', member => {
      onJoin(member)
    })

  }

}
