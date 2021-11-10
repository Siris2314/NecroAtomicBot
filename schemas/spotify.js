const {Schema, model} = require('mongoose');
module.exports = model(
    "spotify",
    new Schema({
        Guild:String,
        Channel:String,
        Song:String,
        Username:String,
    })
);