require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const imageRouter = require("./src/routes/image.routes.js");

app.use(express.json());

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB: ", err);
    }
}
connectDB();

app.use("/api", imageRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});