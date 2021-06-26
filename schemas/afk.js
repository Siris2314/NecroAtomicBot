const mongoose = require('mongoose')

const afkSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    user:String,
    reason:String,
    date: Number,
    messagesLeft: {type:Number, default:3}
})

module.exports = mongoose.model('afk', afkSchema,'afks')