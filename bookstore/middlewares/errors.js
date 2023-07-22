const notFuond = (req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHanlder = (err, req, res, next) => {
    const statusCode = req.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({ message: err.message })
}



module.exports = { notFuond, errorHanlder }
