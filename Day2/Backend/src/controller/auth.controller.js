function login(req, res) {
    res.status(200).json({
        message: "Login Route",
    })
}

function signup(req, res) {
    res.status(200).json({
        message: "SignUp Route",
    })
}

module.exports = { login, signup };