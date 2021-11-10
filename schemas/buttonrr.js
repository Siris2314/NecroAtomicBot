const {Schema, model} = require('mongoose');

const reactionRole = new Schema({
    name:String,
    guild:String,
    message:String,
    roles:[{
        role:String,
        emoji:String
    }]

})

module.exports = model('reactionRole',reactionRole);