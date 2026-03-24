const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/auth.controller.js");

authRouter.post("/signup",authController.signup);

authRouter.post("/login",authController.login);

module.exports = authRouter;