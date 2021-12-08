const mongo = require('mongoose')

const Schema = new mongo.Schema({
    Guild:String,
    Name:String,
    Queue:Array,
    
})

module.exports = mongo.model("queueSchema", Schema)