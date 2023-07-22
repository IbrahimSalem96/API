const express = require('express')
const router = express.Router()
const { getA11Users, getUserById, updateUser, deleteUser } = require('../controller/usersController')
const { VerifyTokenAndAuthorization, VerifyTokenAndAdmin } = require('../middlewares/verifyToken')

router.route('/')
    .get(VerifyTokenAndAdmin, getA11Users)


router.route('/:id')
    .get(VerifyTokenAndAuthorization, getUserById)
    .put(VerifyTokenAndAuthorization, updateUser)
    .delete(VerifyTokenAndAuthorization, deleteUser)


module.exports = router
