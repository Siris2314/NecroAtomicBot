const {Schema, model} = require('mongoose')

module.exports = model("Starboard", new Schema({
    Guild:String,
    Channel: String,
   })
)