const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    userID: String,
    todos: Array
});

module.exports = model("todo", todoSchema);