const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"
        }
    ]
});

const User = mongoose.model("User", user);

module.exports = User;