const express = require("express");
const app = express();
const PORT = 2019;
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    withCredentials: true,
}));

app.get("/data", (req, res) => {
    res.status(200).json({
        message: "Course details fetched successfully",
        data: {
            course: "React",
            instructor: "Dibyo",
            duration: "4 weeks",
            price: 2000,
        }
    });
});

app.listen(PORT, () => {
    console.log(`Sever is listening on: ${PORT}`);
});