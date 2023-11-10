const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")
const {array} = require("joi");

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    dateAdded: { type: Date, default: Date.now },
    priority: String,
    userId: String,
});

const Note = mongoose.model("Note", noteSchema)

const validate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        content: Joi.string().required().label("Content"),
        priority: Joi.string().required().label("Priority"),
    })
    return schema.validate(data)
}
const validateForUpdate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        content: Joi.string().required().label("Content"),
    })
    return schema.validate(data)
}
module.exports = { Note, validate, validateForUpdate }