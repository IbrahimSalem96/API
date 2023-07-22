const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        minLength: 3
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1024,
        minLength: 0
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"] // enum => It means only one of them
    }
}, {
    timestamps: true
})


const Book = mongoose.model('Book', BookSchema);


//validate Create Book
function validateCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30).required(),
        description: Joi.string().trim().min(3).max(1024).required(),
        author: Joi.string().required(),
        price: Joi.number().required(),
        cover: Joi.string().valid("soft cover", "hard cover").required() //valid => enum
    })

    return schema.validate(obj)
}


//validate Update Book
function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30),
        description: Joi.string().trim().min(3).max(1024),
        author: Joi.string(),
        price: Joi.number(),
        cover: Joi.string().valid("soft cover", "hard cover")
    })

    return schema.validate(obj)
}


module.exports = { Book, validateCreateBook, validateUpdateBook }