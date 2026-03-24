function signup(req, res) {
    res.status(200).json({
        message: "SignUp Successful"
    });
}

function login(req, res) {
    res.status(200).json({
        message: "Login Successful"
    });
}

module.exports = { signup, login };