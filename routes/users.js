const express = require('express');
const router = new express.Router();
const regValidate = require('../validator.js');

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post(
    '/register', 
    regValidate.userValidationRules(),
    regValidate.validate,
    usersController.createUser);

router.put('/:id',usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;