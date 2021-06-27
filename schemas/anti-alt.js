const mongoose = require("mongoose")


module.exports = mongoose.model(
    "anti-alt",
    new mongoose.Schema({
        Guild: String,
        Option:String,
        Channel:String,
        Days: String

    })
);