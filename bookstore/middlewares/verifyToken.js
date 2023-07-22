const jwt = require('jsonwebtoken')

//Verify Token user
function verifyToke(req, res, next) {
    const token = req.headers.token

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json("invalid token")
        }
    } else {
        res.status(401).json("no token provided")
    }
}


//Verify Token & Authorize the user
function VerifyTokenAndAuthorization(req, res, next) {
    verifyToke(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("you are not allowed")
        }
    })
}


//Verify Token & Admin
function VerifyTokenAndAdmin(req, res, next) {
    verifyToke(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("you are not allowed, only admin allowed")
        }
    })
}


module.exports = { verifyToke, VerifyTokenAndAuthorization, VerifyTokenAndAdmin }