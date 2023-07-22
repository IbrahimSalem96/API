const asyncHandler = require('express-async-handler')
const { User, validateRegisterUser, validateLoginUser } = require('../models/User')
const bcrypt = require('bcrypt')



/**
 * 
 *  @desc Register New User
 *  @route /api/auth/register
 *  @method POST
 *  @access public 
 * 
 */
const register = asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json("This user is already registered.")
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt)

    user = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })

    const result = await user.save()
    // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY) => generate token file model
    const token = user.generateToken()
    const { password, ...other } = result._doc
    res.status(201).json({ ...other, token }) //send all data and token .... hedden password

})



/**
 * 
 *  @desc Login User
 *  @route /api/auth/register
 *  @method POST
 *  @access public 
 * 
 */
const login = asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json("invalid email")
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid password" })
    }

    // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY)
    const token = user.generateToken()

    const { password, ...other } = user._doc
    res.status(201).json({ ...other, token }) //send all data and token .... hedden password
})



module.exports = { register, login }