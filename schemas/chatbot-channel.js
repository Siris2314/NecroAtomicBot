const {Schema, model} = require('mongoose')

module.exports = model("chatbot", new Schema({
    Guild:String,
    Channel: String,
   })
)