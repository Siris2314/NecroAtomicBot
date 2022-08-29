const {Schema, model} = require('mongoose')

module.exports = model("muted-members",new Schema({
    Guild:String,
    Users:Array
}))