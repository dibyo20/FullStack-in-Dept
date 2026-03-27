require("dotenv").config();
const app = require("./src/app.js");
const PORT = process.env.PORT || 2009;
const connectDB = require("./src/config/database.js");

connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});