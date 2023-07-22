const asyncHandler = require('express-async-handler')
const { Author, validateCreateAuthor, validateUpdateAuthor } = require('../models/Auther')

/**
 * 
 *  @desc Get all authors
 *  @route /api/authors
 *  @method GET
 *  @access public 
 * 
 */
// router.get('/', async (req, res) => {
//     try {
//         const author = await Author.find({})
//         res.status(200).json(author)

//     } catch (error) {
//         res.status(500).json({ message: "Something went omething" })

//     }
// })

//asyncHandler 
const getA11Authors = asyncHandler(async (req, res) => {
    const author = await Author.find({})
    res.status(200).json(author)
})


/**
 * 
 *  @desc Get author by id
 *  @route /api/authors/:id
 *  @method GET
 *  @access public 
 * 
 */
// router.get('/:id', async (req, res) => {
//     try {
//         const author = await Author.findById(req.params.id)
//         if (author) {
//             res.status(200).json(author)
//         } else {
//             res.status(404).json({ message: "author not found . . !" })
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Something went omething" })

//     }
// })
const getauthorById = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id)
    if (author) {
        res.status(200).json(author)
    } else {
        res.status(404).json({ message: "author not found . . !" })
    }
})


/**
 *
 *  @desc created new author
 *  @route /api/authors/
 *  @method POST
 *  @access private ( only admin)
 *
 */
// router.post('/', async (req, res) => {
//     const { error } = validateCreateAuthor(req.body)
//     if (error) {
//         res.status(400).json({ message: error.details[0].message })
//     }

//     try {
//         const author = new Author({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             nationality: req.body.nationality,
//             image: req.body.image,
//         })
//         const result = await author.save()
//         res.status(201).json(result)

//     } catch (error) {
//         res.status(500).json({ message: "Something went omething" })
//     }
// })
const createAuthor = asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
    })
    const result = await author.save()
    res.status(201).json(result)

})


/**
 *
 *  @desc Update a author
 *  @route /api/authors/:id
 *  @method PUT
 *  @access private ( only admin)
 *
 */
// router.put('/:id', async (req, res) => {
//     const { error } = validateUpdateAuthor(req.body)
//     if (error) {
//         res.status(400).json({ message: error.details[0].message })
//     }

//     try {
//         const author = await Author.findByIdAndUpdate(req.params.id, {
//             $set: {
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 nationality: req.body.nationality,
//                 image: req.body.image,
//             }
//         }, { new: true })

//         if (!author) {
//             return res.status(404).send('invalid id author')
//         }
//         res.status(200).json(author)

//     } catch (error) {
//         res.status(500).json({ message: "Something went omething" })
//     }
// })
const updateAuthor = asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }

    const author = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
        }
    }, { new: true })

    if (!author) {
        return res.status(404).send('invalid id author')
    }
    res.status(200).json(author)
})


/**
 *
 *  @desc Delete a author
 *  @route /api/authors/:id
 *  @method DELETE
 *  @access private ( only admin)
 *
 */
// router.delete('/:id', async (req, res) => {
//     try {
//         const author = await Author.findByIdAndRemove(req.params.id)
//         if (author) {
//             res.status(200).json(author)
//         } else {
//             res.status(404).json({ message: "author is not found . . !" })
//         }

//     } catch (error) {
//         res.status(500).json({ message: "Something went omething" })

//     }
// })
const deleteAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id)
    if (author) {
        await Author.findByIdAndDelete(req.params.id)
        res.status(200).json(author)
    } else {
        res.status(404).json({ message: "author is not found . . !" })
    }
})















module.exports = { getA11Authors, getauthorById, createAuthor, updateAuthor, deleteAuthor }