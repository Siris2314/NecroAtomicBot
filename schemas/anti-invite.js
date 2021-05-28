const mongoose = require("mongoose")


module.exports = mongoose.model(
    "anti-invite",
    new mongoose.Schema({
        Server: String
    })
);