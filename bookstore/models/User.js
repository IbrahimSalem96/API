const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const passwordComplexity = require("joi-password-complexity");

const Schema = mongoose.Schema

//Schema User collection 
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false

    }
}, { timestamps: true })

//token 
UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY)
}

//Model user 
const User = mongoose.model('User', UserSchema)


//Validate Register User 
function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        userName: Joi.string().trim().min(2).max(100).required(),
        password: passwordComplexity().required(),
    })

    return schema.validate(obj)
}


//Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    })

    return schema.validate(obj)
}


// Validate Change Password
function validateChangePassword(obj) {
    const schema = Joi.object({
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}


//Validate Register User 
function validateUpdateUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).email(),
        userName: Joi.string().trim().min(2).max(100),
        password: Joi.string().trim().min(8),
    })

    return schema.validate(obj)
}


module.exports = { User, validateRegisterUser, validateLoginUser, validateUpdateUser, validateChangePassword }

