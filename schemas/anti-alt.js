const mongoose = require("mongoose")


module.exports = mongoose.model(
    "anti-alt",
    new mongoose.Schema({
        Guild: String,
        Channel:String,
        Days: Number

    })
);