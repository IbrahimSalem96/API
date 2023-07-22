const express = require('express')
const router = express.Router()
const { getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, resetThePassword } = require('../controller/passwordController')

router.route('/forget-password')
    .get(getForgotPasswordView)
    .post(sendForgotPasswordLink)


router.route('/reset-password/:userId/:token')
    .get(getResetPasswordView)
    .post(resetThePassword)


module.exports = router