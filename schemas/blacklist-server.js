const mongoose = require("mongoose")


module.exports = mongoose.model(
    "blacklisted-servers",
    new mongoose.Schema({
        Server: String
    })
);