const mongoose = require("mongoose")

const poll = mongoose.Schema({
    messageId: { type: String, required: true },
    users: Array,
})

module.exports = mongoose.model("poll", poll)