require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/Config/db.config.js");
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});