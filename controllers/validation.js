const Joi = require('@hapi/joi');

const usersSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(new RegExp('^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,})\\S$')).required(),
    firstName: Joi.string().pattern(new RegExp('^[A-Za-z]')).required(),
    lastName: Joi.string().pattern(new RegExp('^[A-Za-z]')).required()
});

const booksSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().required(),
    publication_date: Joi.date(),
    purchase_date: Joi.date(),
    read: Joi.boolean().required(),
    rating: Joi.number().min(0).max(10),
    user_id: Joi.string().required(),
});

module.exports = { usersSchema, booksSchema };