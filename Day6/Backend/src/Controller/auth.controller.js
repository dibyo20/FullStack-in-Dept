function signup(req, res) {
    res.status(200).json({
        message: "Signup Successful",
    });
}

function login(req, res) {
    res.status(200).json({
        message: "Login Successful",
    });
}

module.exports = { signup, login };