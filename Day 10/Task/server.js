require("dotenv").config();
const app = require("./src/app.js");
const PORT = process.env.PORT;
const connectDB = require("./src/config/db.js");

connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});
