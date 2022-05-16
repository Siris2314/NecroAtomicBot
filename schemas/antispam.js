const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    warnThreshold:Number,
    muteThreshold: Number,
    kickThreshold: Number,
    banThreshold: Number,
    timeInterval:Number,
    maxDuplicatesWarning: Number,
    maxDuplicatesKick:Number,
    maxDuplicatesBan:Number,
    maxDuplicatesMute:Number,
    ignoreBots:Boolean,
    unMuteTime:Number,
    removeMessage:Boolean,
})

module.exports = mongoose.model('antispam', Schema)