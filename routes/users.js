const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authenticate.js")

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', isAuthenticated, usersController.createUser);
    
router.put('/:id',isAuthenticated, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;