const express = require('express');
const app = express();
const PORT = 2019;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    withCredentials: true,
}));

app.get("/data", (req, res) => {
    res.status(200).json({
        message: "Course details fetched successfully",
        data: {
            courseName: "Full Stack Development",
            courseDuration: "8 months",
            courseFee: 15000,
            instructor: "Dibyo Banerjee",
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});