const authRouter = require("express").Router();
const { register, login, logout, getme } = require("../controllers/auth.controller.js");
const { registerValidator, loginValidator } = require("../validators/auth.validator.js");
const handleError = require("../middlewares/error.middleware.js");

// middlewares
authRouter.use(handleError);

// routes
authRouter.post("/signup", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.post("/logout", logout);
authRouter.get("/me", getme);

module.exports = authRouter;