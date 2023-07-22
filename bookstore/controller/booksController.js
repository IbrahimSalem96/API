const asyncHandler = require('express-async-handler')
const { Book, validateCreateBook, validateUpdateBook } = require('../models/Book')


/**
 * 
 *  @desc Get all book
 *  @route /api/books
 *  @method GET
 *  @access public 
 * 
 */
const getA11Books = asyncHandler(async (req, res) => {
    const book = await Book.find().populate("author", ['firstName', 'lastName', 'nationality'])
    res.status(200).json(book)
})



/**
 * 
 *  @desc Get book by id
 *  @route /api/books/:id
 *  @method GET
 *  @access public 
 * 
 */
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author")
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ message: "Book not found . . !" })
    }
}
)



/**
 * 
 *  @desc created new book 
 *  @route /api/books/
 *  @method POST
 *  @access private ( only Admin )  
 * 
 */
const createBook = asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    })


    const result = await book.save()
    res.status(201).json(result)

})



/**
 * 
 *  @desc Update a book 
 *  @route /api/books/:id
 *  @method PUT
 *  @access public 
 * 
 */
const updateBook = asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }

    const book = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    })

    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ message: "Book not found . . !" })
    }
})



/**
 * 
 *  @desc Delete a book 
 *  @route /api/books/:id
 *  @method DELETE
 *  @access public 
 * 
 */
const deleteBook = asyncHandler(async (req, res) => {
    const book = Book.findById(req.params.id)
    if (book) {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Book has been delete" })
    } else {
        res.status(404).json({ message: "Book not found . . !" })
    }
})



module.exports = { getA11Books, getBookById, createBook, updateBook, deleteBook }