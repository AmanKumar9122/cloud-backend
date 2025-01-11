const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://amanraj15112003:M3HdmS7MQbIDmtX6@cloud.s1s98.mongodb.net/?retryWrites=true&w=majority&appName=cloud");
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;