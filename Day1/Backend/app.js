const express = require("express");
const app = express();
const PORT = 2045;

app.post("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});

