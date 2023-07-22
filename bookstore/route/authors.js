const express = require('express')
const router = express.Router()
const { VerifyTokenAndAdmin } = require('../middlewares/verifyToken')
const { getA11Authors, getauthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controller/authorsController')


router.route('/')
    .get(getA11Authors)
    .post(VerifyTokenAndAdmin, createAuthor)


router.route('/:id')
    .get(getauthorById)
    .put(VerifyTokenAndAdmin, updateAuthor)
    .delete(VerifyTokenAndAdmin, deleteAuthor)

module.exports = router