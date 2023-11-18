const express = require('express');
const router = express.Router();
const { usersSchema } = require('../controllers/validation');

const usersController = require('../controllers/users');
const booksController = require('../controllers/books');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getById);

router.get('/:id/books', booksController.getByUserId);

router.post('/', async (req, res, next) => {
    try {
        const result = await usersSchema.validateAsync(req.body);
        console.log(result);
    } catch (error) {
        if(error.isJoi) error.status = 422;
        next(error);
    }
}, usersController.createUser);

router.put('/:id', async (req, res, next) => {
    try {
        const result = await usersSchema.validateAsync(req.body);
        console.log(result);
    } catch (error) {
        if(error.isJoi) error.status = 422;
        next(error);
    }
}, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;