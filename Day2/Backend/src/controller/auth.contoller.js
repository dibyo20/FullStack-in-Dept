function signup(req, res) {
    res.status(200).json({
        message: "Signed Up",
    })
}

function login(req, res) {
    res.status(200).json({
        message: "Loged In",
    })
}

module.exports = { signup, login };