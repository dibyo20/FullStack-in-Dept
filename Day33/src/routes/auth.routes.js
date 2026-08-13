const authRouter = require("express").Router();
const { register, login, logout, getme } = require("../controllers/auth.controller.js");


authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", getme);

module.exports = authRouter;