
const mongo = require('./mongo.js')
const profileSchema = require('./schemas/profile-schema')

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')

      const result = await profileSchema.findOneAndUpdate({
        guildId,
        userId
      }, {
        guildId,
        userId,
        $inc: {
          coins
        }
      }, {
        upsert: true,
        new: true
      })

      return result.coins

    }finally {
      mongoose.connection.close()
    }
  })

}

module.exports.getCoins = async (guildId, userId) => {
  return await mongo().then( async mongoose => {
    try{
      console.log('Running findOne()')

    const result =  await profileSchema.findOne({
      guildId,
      userId
    })
    console.log('RESULT:', result)
    let coins = 0
    if(result) {
      coins  = result.coins
    } else {
      console.log('Inserting a document')
      await new profileSchema({
        guildId,
        userId,
        coins
      }).save()
    }
    return coins
  } finally {
    mongoose.connection.close()
  }
  })
}
