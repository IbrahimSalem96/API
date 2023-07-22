const { User, validateUpdateUser } = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');


/**
 * 
 *  @desc Get All User
 *  @route /api/users
 *  @method Get
 *  @access private ( only Admin )
 * 
 */
getA11Users = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password -_id')
    res.status(200).json(users)

})


/**
 * 
 *  @desc Get User by id
 *  @route /api/users/:id
 *  @method Get
 *  @access private ( only Admin & user himselft )
 * 
 */
getUserById = asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id).select("-password")
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404).json({ message: "users not found . . !" })
    }
})


/**
 * 
 *  @desc Update User
 *  @route /api/users/:id
 *  @method PUT
 *  @access private
 * 
 */
updateUser = asyncHandler(async (req, res) => {

    //Check if he really is the owner of the account. The user came from middleware
    if (req.user.id !== req.params.id) {
        return res.status(403).json('you are not allowed, you only can update your profilel')
    }

    const { error } = validateUpdateUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    let updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
        }
    }, { new: true }).select('-password')

    res.status(200).json(updateUser)

})



/**
 * 
 *  @desc Delete User by id
 *  @route /api/users/:id
 *  @method DELETE
 *  @access private ( only Admin & user himselft )
 * 
 */
deleteUser = asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id).select("-password")
    if (users) {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "user has been deleted successfully" })
    } else {
        res.status(404).json({ message: "users not found . . !" })
    }
})




module.exports = { getA11Users, getUserById, updateUser, deleteUser }