const {Schema, model} = require('mongoose');
module.exports = model(
    "Music",
    new Schema({
        Guild:String,
        Channel:String,
        Playlist:String,
        Username:String,
    })
);