const mongo = require('../mongo.js')
const economy = require('../economy.js')
const dailyRewardsSchema = require('../schemas/daily-rewards-schema')


let claimedCache = []

const clearCache = () => {
  claimedCache = []
  setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()



const alreadyClaimed = 'You have already claimed your daily rewards'

module.exports = {
  name:'daily',
  description: 'hands out daily rewards',

  async execute(message,args){

    const newCoins = await economy.addCoins(guildId, userId,  coins);

    const {guild, member} = message
    const {id} = member

    if(claimedCache.includes(id)){
      console.log('Returning from cache')
      message.reply(alreadyClaimed)
    }
    console.log('Fetching from mongo')

    const obj = {
      guildId: guild.id,
      userId: id
    }

    await mongo().then(async mongoose => {
      try {
        const results = await dailyRewardsSchema.findOne(obj)

        if(results) {
          const then =  new Date(results.updatedAt).getTime()
          const now = new Date().getTime()
          const diffTime = Math.abs(now - then)
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

          if(diffDays <= 1){


            claimedCache.push(id)

            message.reply(alreadyClaimed)
          }
        }

        await dailyRewardsSchema.findOneAndUpdate(obj, obj, {
          upsert: true
        })

        claimedCache.push(id)

        message.reply('You have claimed your daily rewards')

      } finally {
        mongoose.connection.close()
      }
    })
  }
}
