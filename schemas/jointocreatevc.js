const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    guildId: String,
    channelId: String,
  
})

module.exports = mongoose.model('jointocreatevc', schema);