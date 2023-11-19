const express = require('express');
const router = express.Router();
const { booksSchema } = require('../controllers/validation');

const booksController = require('../controllers/books');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getById);

router.post('/', async (req, res, next) => {
    try {
        const result = await booksSchema.validateAsync(req.body);
        if(result) {
            next();
        } else {
            throw new Error('Some error occurred while creating the user');
        }
    } catch (error) {
        if(error.isJoi) error.status = 422;
        next(error);
    }
}, booksController.createBook);

router.put('/:id', async (req, res, next) => {
    try {
        const result = await booksSchema.validateAsync(req.body);
        if(result) {
            next();
        } else {
            throw new Error('Some error occurred while creating the user');
        }
    } catch (error) {
        if(error.isJoi) error.status = 422;
        next(error);
    }
}, booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;