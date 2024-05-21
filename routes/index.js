const express = require('express');
const router = new express.Router();

router.use('/', require('../swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello World!");
});

router.use('/users', require('./users'))
router.use('/books', require('./books'))

module.exports = router;