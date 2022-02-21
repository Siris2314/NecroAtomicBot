const {model, Schema} = require('mongoose')

module.exports = model("Filter", new Schema({
    Guild:String,
    Log:String,
    Words:[String],
}))