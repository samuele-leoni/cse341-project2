const express = require('express');
const router = express.Router();
const { validate, booksSchema } = require('../middleware/validator');

const { isAuthenticated } = require('../middleware/authenticate');

const booksController = require('../controllers/books');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getById);

router.get('/users/:id', isAuthenticated, booksController.getByUserId);

router.post('/', isAuthenticated, validate(booksSchema), booksController.createBook);

router.put('/:id', isAuthenticated, validate(booksSchema), booksController.updateBook);

router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;