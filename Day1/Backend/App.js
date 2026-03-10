const express = require("express");
const app = express();
const PORT = 2000;

// console.log("Server is running"); // This line will execute immediately when the server starts, but it won't indicate that the server is actually listening for requests.

app.post("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});