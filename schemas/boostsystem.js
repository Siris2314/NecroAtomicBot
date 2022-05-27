const mongoose = require("mongoose")


module.exports = mongoose.model(
    "boostsystem",
    new mongoose.Schema({
        Server: String,
        Channel:String
    })
);