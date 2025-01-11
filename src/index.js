const express = require("express");
const bodyParser = require("body-parser");

const User = require("./model/user");
const Todo = require("./model/todo");
const { PORT } = require("./config/env");
const connectDB = require("./db");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get("/", (req, res) => {
    return res.json({message: "Healthy..."});
});

// create user
app.post("/user", async (req, res) => {
    const userPayload = {};
    userPayload.name = req.body.name;
    userPayload.password = req.body.password;
    const prevUser = await User.findOne({ name: userPayload.name });
    
    if(prevUser) return res.status(400).json({message: "User already exists."});
    
    const newUser = await User.create({
        name: userPayload.name,
        password: userPayload.password
    });

    return res.status(200).json(newUser);
});

// get user
app.get("/user", async (req, res) => {
    const userPayload = {};
    userPayload.name = req.body.name;
    const user = await User.findOne({ name: userPayload.name }).populate("Todo");

    return res.status(200).json(user);
});

// add todo for user
app.post("/todo", async (req, res) => {
    const newTodo = await Todo.create({
        name: req.body.todoName
        
    });
    return res.status(200).json(newTodo);
});

// get all todos for user
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();

    return res.status(200).json(todos);
});

app.listen(3000, async() => {
    await connectDB();
    console.log(`Server running on port 3000`);
});