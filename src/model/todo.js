const mongoose = require("mongoose");

const todo = new mongoose.Schema({
    name: String,
});

const Todo = mongoose.model("Todo", todo);

module.exports = Todo;