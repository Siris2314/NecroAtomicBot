const {model, Schema} = require('mongoose')

module.exports = model("ranks", 
    new Schema({
        Guild: String,
        Rank: String,
        Role: String
    })

)