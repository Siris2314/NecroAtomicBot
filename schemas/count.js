const {Schema, model} = require('mongoose')

module.exports = model("count", new Schema({
    Guild:String,
    Channel: String,
    Count: Number,
    UserID: Number,
   })
)