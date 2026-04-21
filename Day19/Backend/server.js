require("dotenv").config();
const app = require("./src/app.js");
const PORT = process.env.PORT;
const connectDb = require("./src/config/db.js");

connectDb();

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});