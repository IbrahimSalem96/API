const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        minLength: 3
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        minLength: 3
    },
    image: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1024,
        minLength: 3,
        default: "default-image.png"
    }
}, {
    timestamps: true
})

const Author = mongoose.model('Author', AuthorSchema);

function validateCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(100).required(),
        lastName: Joi.string().trim().min(3).max(100).required(),
        nationality: Joi.string().trim().min(3).max(100).required(),
        image: Joi.string().trim().min(3).max(1024).required()
    })

    return schema.validate(obj)
}

function validateUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(100),
        lastName: Joi.string().trim().min(3).max(100),
        nationality: Joi.string().trim().min(3).max(100),
        image: Joi.string().trim().min(3).max(1024)
    })

    return schema.validate(obj)
}



module.exports = { Author, validateCreateAuthor, validateUpdateAuthor }