const express = require('express')
const router = express.Router()
const { VerifyTokenAndAdmin } = require('../middlewares/verifyToken')
const { getA11Books, getBookById, createBook, updateBook, deleteBook } = require('../controller/booksController')


// route 
router.route('/')
    .get(getA11Books)   //router.get('/', getA11Books)
    .post(VerifyTokenAndAdmin, createBook)   //router.post('/', VerifyTokenAndAdmin, createBook)


router.route('/:id')
    .get(getBookById)   //router.get('/:id', getBookById)
    .post(VerifyTokenAndAdmin, updateBook)   //router.put('/:id', VerifyTokenAndAdmin, updateBook)
    .post(VerifyTokenAndAdmin, deleteBook)   //router.delete('/:id', VerifyTokenAndAdmin, deleteBook)


module.exports = router
