const { body, param, query, validationResult } = require("express-validator");

const registerValidator = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed")
            error.statusCode = 400
            error.details = errors.array()

            return next(error)
        }
        next();
    }
];

const loginValidator = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed")
            error.statusCode = 400
            error.details = errors.array()

            return next(error)
        }
        next();
    }
];

module.exports = {
    registerValidator,
    loginValidator
}