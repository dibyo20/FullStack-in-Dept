const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth.controller");

authRouter.post("/signup", authController.signup);

authRouter.post("/signin", authController.login);

module.exports = authRouter;