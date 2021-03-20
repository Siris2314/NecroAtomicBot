const {Schema, model } = require('mongoose');

module.exports = model('member-count', new Schema({
    Guild:String,
    Channel:String,
    Member: String
    })
);