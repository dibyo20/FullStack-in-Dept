const express = require("express");
const app = express();
const authRouter = require("./Routes/auth.routes.js");

app.use("/api/auth", authRouter);

module.exports = app;