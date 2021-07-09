const mongoose = require("mongoose")


module.exports = mongoose.model(
    "nsfw",
    new mongoose.Schema({
        Server: String,
    })
);