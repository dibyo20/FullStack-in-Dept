require("dotenv").config();
const app = require("./src/app");
let PORT = process.env.PORT;
const connectDB = require("./src/config/db.config");

connectDB();

app.listen(PORT, () => {
    console.log(`Server is listining on ${PORT}`);
});