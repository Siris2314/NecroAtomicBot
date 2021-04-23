const {Schema, model} = require('mongoose')

module.exports = model("customvoice", new Schema({
    Guild:String,
    Channel: String,
   })
)