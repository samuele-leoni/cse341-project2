const express = require('express');
const router = express.Router();
const { validate, usersSchema } = require('../middleware/validator');

const usersController = require('../controllers/users');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getById);

router.post('/', isAuthenticated, validate(usersSchema), usersController.createUser);

router.put('/:id', isAuthenticated, validate(usersSchema), usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;