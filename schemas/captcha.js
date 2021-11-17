const {Schema, model} = require('mongoose')

module.exports = model("captcha", new Schema({
    Guild: String,
    Role: Object,
}))